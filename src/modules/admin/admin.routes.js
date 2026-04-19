import { Router } from "express";
import * as ctrl from "./admin.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/audit-logs", ctrl.getAuditLogs);
router.patch("/assignments/:id/reopen", ctrl.reopenAssignment);

export default router;
