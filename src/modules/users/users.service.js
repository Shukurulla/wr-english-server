import { User } from "../../models/User.js";
import { Group } from "../../models/Group.js";
import { ApiError } from "../../utils/api-error.js";

export async function listUsers({ role, groupId, isActive, search, page, limit }) {
  const filter = {};
  if (role) filter.role = role;
  if (groupId) filter["studentInfo.groupId"] = groupId;
  if (isActive !== undefined) filter.isActive = isActive === "true";
  if (search) filter.fullName = { $regex: search, $options: "i" };

  const [data, total] = await Promise.all([
    User.find(filter)
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    User.countDocuments(filter)
  ]);
  return { data, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export async function getUser(id) {
  const user = await User.findById(id).select("-passwordHash").lean();
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

export async function createUser(body) {
  const exists = await User.findOne({ email: body.email.toLowerCase() });
  if (exists) throw ApiError.conflict("Email already exists");

  const passwordHash = await User.hashPassword(body.password);
  const user = await User.create({
    ...body,
    email: body.email.toLowerCase(),
    passwordHash,
    mustChangePassword: true
  });

  if (body.role === "student" && body.studentInfo?.groupId) {
    await Group.findByIdAndUpdate(body.studentInfo.groupId, { $inc: { studentCount: 1 } });
  }

  return user.toJSON();
}

export async function updateUser(id, body) {
  const user = await User.findById(id);
  if (!user) throw ApiError.notFound("User not found");

  if (body.email && body.email !== user.email) {
    const dup = await User.findOne({ email: body.email.toLowerCase() });
    if (dup) throw ApiError.conflict("Email already exists");
  }

  // HIGH #10: guruh o'zgartirganda studentCount yangilash
  const oldGroupId = user.studentInfo?.groupId?.toString();
  const newGroupId = body.studentInfo?.groupId?.toString();
  if (user.role === "student" && newGroupId && oldGroupId !== newGroupId) {
    if (oldGroupId) await Group.findByIdAndUpdate(oldGroupId, { $inc: { studentCount: -1 } });
    await Group.findByIdAndUpdate(newGroupId, { $inc: { studentCount: 1 } });
  }

  Object.assign(user, body);
  await user.save();
  return user.toJSON();
}

export async function deleteUser(id) {
  const user = await User.findById(id);
  if (!user) throw ApiError.notFound("User not found");
  user.isActive = false;
  await user.save();

  if (user.role === "student" && user.studentInfo?.groupId) {
    await Group.findByIdAndUpdate(user.studentInfo.groupId, { $inc: { studentCount: -1 } });
  }
  return user.toJSON();
}

export async function bulkImport(rows) {
  const results = { created: 0, errors: [] };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      const exists = await User.findOne({ email: row.email.toLowerCase() });
      if (exists) {
        results.errors.push({ row: i + 1, message: `Email ${row.email} already exists` });
        continue;
      }
      const passwordHash = await User.hashPassword(row.password || "changeme123");
      await User.create({
        fullName: row.fullName,
        email: row.email.toLowerCase(),
        passwordHash,
        role: row.role || "student",
        mustChangePassword: true,
        studentInfo: row.studentInfo
      });

      if (row.studentInfo?.groupId) {
        await Group.findByIdAndUpdate(row.studentInfo.groupId, { $inc: { studentCount: 1 } });
      }
      results.created++;
    } catch (err) {
      results.errors.push({ row: i + 1, message: err.message });
    }
  }
  return results;
}
