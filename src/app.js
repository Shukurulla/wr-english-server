import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { config } from "./config/env.js";
import { generalLimiter } from "./middlewares/rate-limit.middleware.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import groupsRoutes from "./modules/groups/groups.routes.js";
import tasksRoutes from "./modules/tasks/tasks.routes.js";
import assignmentsRoutes from "./modules/tasks/assignments.routes.js";
import submissionsRoutes from "./modules/submissions/submissions.routes.js";
import gradesRoutes from "./modules/grades/grades.routes.js";
import complaintsRoutes from "./modules/complaints/complaints.routes.js";
import finalTestRoutes from "./modules/final-test/final-test.routes.js";
import reportsRoutes from "./modules/reports/reports.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

export function buildApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());

  const allowedOrigins = config.CLIENT_ORIGIN
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  app.use(
    cors({
      origin(origin, callback) {
        // Allow same-origin / curl / server-to-server (no Origin header)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`CORS: origin ${origin} is not allowed`));
      },
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  if (config.NODE_ENV !== "test") {
    app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev"));
  }

  app.use("/api/v1", generalLimiter);

  // Serve uploaded files
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

  app.get("/health", (_req, res) => res.json({ success: true, data: { status: "ok" } }));

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/users", usersRoutes);
  app.use("/api/v1/groups", groupsRoutes);
  app.use("/api/v1/tasks", tasksRoutes);
  app.use("/api/v1/assignments", assignmentsRoutes);
  app.use("/api/v1/submissions", submissionsRoutes);
  app.use("/api/v1/grades", gradesRoutes);
  app.use("/api/v1/complaints", complaintsRoutes);
  app.use("/api/v1/final-test", finalTestRoutes);
  app.use("/api/v1/reports", reportsRoutes);
  app.use("/api/v1/admin", adminRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
