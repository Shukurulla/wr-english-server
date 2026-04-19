import { User } from "../../models/User.js";
import { AuditLog } from "../../models/AuditLog.js";
import { ApiError } from "../../utils/api-error.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt.js";

function buildTokens(user) {
  const payload = { sub: user._id.toString(), role: user.role };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload)
  };
}

function publicUser(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    avatar: user.avatar || null,
    mustChangePassword: user.mustChangePassword,
    studentInfo: user.studentInfo,
    teacherInfo: user.teacherInfo
  };
}

export async function login({ email, password, ip, userAgent }) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.isActive) {
    await AuditLog.create({
      action: "auth.login.failed",
      metadata: { email, reason: "not_found_or_inactive" },
      ip,
      userAgent
    });
    throw ApiError.unauthorized("Invalid email or password");
  }

  const valid = await user.verifyPassword(password);
  if (!valid) {
    await AuditLog.create({
      actorId: user._id,
      actorRole: user.role,
      action: "auth.login.failed",
      metadata: { reason: "wrong_password" },
      ip,
      userAgent
    });
    throw ApiError.unauthorized("Invalid email or password");
  }

  user.lastLoginAt = new Date();
  await user.save();

  await AuditLog.create({
    actorId: user._id,
    actorRole: user.role,
    action: "auth.login.success",
    ip,
    userAgent
  });

  return { ...buildTokens(user), user: publicUser(user) };
}

export async function refresh({ refreshToken }) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Invalid refresh token");
  }
  const user = await User.findById(payload.sub);
  if (!user || !user.isActive) throw ApiError.unauthorized("User not found");
  return { ...buildTokens(user), user: publicUser(user) };
}

export async function changePassword({ userId, currentPassword, newPassword }) {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  const valid = await user.verifyPassword(currentPassword);
  if (!valid) throw ApiError.unauthorized("Current password is incorrect");
  user.passwordHash = await User.hashPassword(newPassword);
  user.mustChangePassword = false;
  await user.save();
  return publicUser(user);
}

export async function register({ fullName, email, password, role, studentInfo, ip, userAgent }) {
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) throw ApiError.conflict("Bu email allaqachon ro'yxatdan o'tgan");

  const passwordHash = await User.hashPassword(password);
  const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    passwordHash,
    role: role || "student",
    studentInfo: studentInfo || undefined
  });

  // Update group student count if student selected a group
  if (user.role === "student" && studentInfo?.groupId) {
    const { Group } = await import("../../models/Group.js");
    const group = await Group.findById(studentInfo.groupId);
    if (group) {
      group.studentCount = await User.countDocuments({
        "studentInfo.groupId": studentInfo.groupId,
        isActive: true
      });
      await group.save();
    }
  }

  await AuditLog.create({
    actorId: user._id,
    actorRole: user.role,
    action: "auth.register",
    ip,
    userAgent
  });

  return { ...buildTokens(user), user: publicUser(user) };
}

export function me(user) {
  return publicUser(user);
}

export async function updateAvatar(userId, avatarUrl) {
  const user = await User.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });
  if (!user) throw ApiError.notFound("User not found");
  return publicUser(user);
}
