import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/User.js";

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Missing or invalid Authorization header");
    }
    const token = header.slice(7);
    const payload = verifyAccessToken(token);
    const user = await User.findById(payload.sub).populate("studentInfo.groupId", "name course semester").lean();
    if (!user || !user.isActive) {
      throw ApiError.unauthorized("User not found or inactive");
    }
    req.user = user;
    req.tokenPayload = payload;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") return next(ApiError.unauthorized("Token expired"));
    if (err.name === "JsonWebTokenError") return next(ApiError.unauthorized("Invalid token"));
    next(err);
  }
}
