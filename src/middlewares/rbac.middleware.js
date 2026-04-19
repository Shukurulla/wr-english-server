import { ApiError } from "../utils/api-error.js";

export function requireRole(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user) return next(ApiError.unauthorized());
    if (!allowedRoles.includes(req.user.role)) {
      return next(ApiError.forbidden("Insufficient role"));
    }
    next();
  };
}
