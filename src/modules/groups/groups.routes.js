import { Router } from "express";
import * as ctrl from "./groups.controller.js";
import * as schemas from "./groups.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

// Public endpoint — registration page needs group list without auth
router.get("/public", ctrl.listPublic);

router.use(requireAuth);

router.get("/", requireRole("teacher", "admin"), validate(schemas.listGroupsSchema), ctrl.list);
router.post("/", requireRole("admin"), validate(schemas.createGroupSchema), ctrl.create);
router.patch("/:id", requireRole("admin"), validate(schemas.updateGroupSchema), ctrl.update);
router.get("/:id/students", requireRole("teacher", "admin"), ctrl.getStudents);
router.post(
  "/:id/students",
  requireRole("admin"),
  validate(schemas.addStudentsSchema),
  ctrl.addStudents
);

export default router;
