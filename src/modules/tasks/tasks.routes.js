import { Router } from "express";
import * as ctrl from "./tasks.controller.js";
import * as schemas from "./tasks.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(requireAuth);

router.get("/", requireRole("teacher", "admin"), validate(schemas.listTasksSchema), ctrl.list);
router.get("/:id", requireRole("teacher", "admin"), ctrl.get);
router.post("/", requireRole("teacher", "admin"), validate(schemas.createTaskSchema), ctrl.create);
router.patch("/:id", requireRole("teacher", "admin"), validate(schemas.updateTaskSchema), ctrl.update);
router.delete("/:id", requireRole("admin"), ctrl.remove);

export default router;
