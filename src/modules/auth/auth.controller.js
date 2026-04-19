import * as authService from "./auth.service.js";
import { ok, created } from "../../utils/response.js";
import { asyncHandler } from "../../utils/async-handler.js";

export const registerCtrl = asyncHandler(async (req, res) => {
  const result = await authService.register({
    ...req.body,
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  });
  return created(res, result);
});

export const loginCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({
    email,
    password,
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  });
  return ok(res, result);
});

export const refreshCtrl = asyncHandler(async (req, res) => {
  const result = await authService.refresh({ refreshToken: req.body.refreshToken });
  return ok(res, result);
});

export const meCtrl = asyncHandler(async (req, res) => {
  return ok(res, authService.me(req.user));
});

export const changePasswordCtrl = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await authService.changePassword({
    userId: req.user._id,
    currentPassword,
    newPassword
  });
  return ok(res, user);
});

export const logoutCtrl = asyncHandler(async (_req, res) => {
  return ok(res, { message: "Logged out" });
});

export const uploadAvatarCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: { code: "BAD_REQUEST", message: "No file uploaded" } });
  }
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  const user = await authService.updateAvatar(req.user._id, avatarUrl);
  return ok(res, user);
});
