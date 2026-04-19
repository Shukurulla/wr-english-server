import { Router } from "express";
import * as ctrl from "./reports.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(requireAuth, requireRole("teacher", "admin"));

router.get("/group/:groupId/summary", ctrl.groupSummary);
router.get("/assignment/:assignmentId/stats", ctrl.assignmentStats);

export default router;
