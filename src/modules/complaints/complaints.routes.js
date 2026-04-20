import { Router } from "express";
import * as ctrl from "./complaints.controller.js";
import * as schemas from "./complaints.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";
import { complaintLimiter } from "../../middlewares/rate-limit.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", requireRole("student"), complaintLimiter, validate(schemas.createComplaintSchema), ctrl.create);
router.get("/my", requireRole("student"), ctrl.myComplaints);
router.get("/", requireRole("teacher", "admin"), ctrl.teacherComplaints);
router.patch("/:id/resolve", requireRole("teacher", "admin"), validate(schemas.resolveComplaintSchema), ctrl.resolve);

export default router;
