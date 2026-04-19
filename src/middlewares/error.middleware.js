import { ApiError } from "../utils/api-error.js";
import { logger } from "../utils/logger.js";

export function notFound(_req, _res, next) {
  next(ApiError.notFound("Route not found"));
}

export function errorHandler(err, req, res, _next) {
  let apiError = err;
  if (!(err instanceof ApiError)) {
    if (err.name === "CastError") {
      apiError = ApiError.badRequest(`Invalid ${err.path}`);
    } else if (err.name === "ValidationError") {
      const details = Object.values(err.errors).map((e) => ({ path: e.path, message: e.message }));
      apiError = ApiError.unprocessable("Validation failed", details);
    } else if (err.code === 11000) {
      apiError = ApiError.conflict(`Duplicate value for ${Object.keys(err.keyValue).join(", ")}`);
    } else {
      logger.error({ err, path: req.path, method: req.method }, "Unhandled error");
      apiError = ApiError.internal();
    }
  }

  if (apiError.statusCode >= 500) {
    logger.error({ err: apiError, path: req.path, method: req.method }, "Server error");
  }

  res.status(apiError.statusCode).json({
    success: false,
    error: {
      code: apiError.code,
      message: apiError.message,
      ...(apiError.details && { details: apiError.details })
    }
  });
}
