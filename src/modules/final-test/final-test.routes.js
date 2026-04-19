import { Router } from "express";
import * as ctrl from "./final-test.controller.js";
import * as schemas from "./final-test.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/start", requireRole("student"), ctrl.start);
router.post("/submit", requireRole("student"), validate(schemas.submitFinalTestSchema), ctrl.submit);
router.post("/force-submit-expired", requireRole("student"), ctrl.forceSubmitExpired);
router.get("/my-attempt", requireRole("student"), ctrl.myAttempt);
router.get("/group/:groupId/attempts", requireRole("teacher", "admin"), ctrl.groupAttempts);
router.delete("/attempts/:id", requireRole("teacher", "admin"), ctrl.resetAttempt);
router.get("/", requireRole("admin"), ctrl.list);
router.post("/questions", requireRole("admin"), validate(schemas.createFinalTestSchema), ctrl.create);

export default router;
