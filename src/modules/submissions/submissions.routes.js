import { Router } from "express";
import * as ctrl from "./submissions.controller.js";
import * as schemas from "./submissions.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";
import { writingSubmitLimiter } from "../../middlewares/rate-limit.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/start", requireRole("student"), validate(schemas.startSchema), ctrl.start);
router.get("/", requireRole("teacher", "admin"), validate(schemas.listSubmissionsSchema), ctrl.list);
router.get("/:id", ctrl.get);
router.post("/:id/answer-reading", requireRole("student"), validate(schemas.answerReadingSchema), ctrl.answerReading);
router.post("/:id/submit-writing", requireRole("student"), writingSubmitLimiter, validate(schemas.submitWritingSchema), ctrl.submitWriting);
router.put("/:id/draft", requireRole("student"), validate(schemas.saveDraftSchema), ctrl.saveDraft);
router.post("/:id/restart", requireRole("student"), ctrl.restart);

export default router;
