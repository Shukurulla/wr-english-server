import { Router } from "express";
import * as ctrl from "./assignments.controller.js";
import * as schemas from "./assignments.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/my", requireRole("student"), ctrl.my);
router.get("/", requireRole("teacher", "admin"), validate(schemas.listAssignmentsSchema), ctrl.list);
router.post("/", requireRole("teacher", "admin"), validate(schemas.createAssignmentSchema), ctrl.create);
router.post("/bulk", requireRole("teacher", "admin"), validate(schemas.bulkAssignSchema), ctrl.bulk);
router.patch("/:id", requireRole("teacher", "admin"), validate(schemas.updateAssignmentSchema), ctrl.update);

export default router;
