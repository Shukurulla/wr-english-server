import { Router } from "express";
import * as ctrl from "./grades.controller.js";
import * as schemas from "./grades.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/my", requireRole("student"), validate(schemas.listGradesSchema), ctrl.myGrades);
router.get("/group/:groupId", requireRole("teacher", "admin"), ctrl.groupGrades);
router.post("/:id/finalize", requireRole("teacher"), validate(schemas.finalizeSchema), ctrl.finalize);
router.patch("/:id/override", requireRole("teacher"), validate(schemas.overrideSchema), ctrl.override);

export default router;
