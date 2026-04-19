import rateLimit from "express-rate-limit";

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: "RATE_LIMITED", message: "Too many requests" } }
});

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: "RATE_LIMITED", message: "Too many login attempts" } }
});

export const writingSubmitLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 1,
  keyGenerator: (req) => req.user?._id?.toString() ?? req.ip,
  message: { success: false, error: { code: "RATE_LIMITED", message: "Please wait before retrying" } }
});

export const complaintLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.user?._id?.toString() ?? req.ip,
  message: { success: false, error: { code: "RATE_LIMITED", message: "Too many complaints" } }
});
