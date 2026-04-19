import { Router } from "express";
import * as ctrl from "./users.controller.js";
import * as schemas from "./users.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";

const router = Router();

router.use(requireAuth, requireRole("admin"));

router.get("/", validate(schemas.listUsersSchema), ctrl.list);
router.post("/", validate(schemas.createUserSchema), ctrl.create);
router.get("/:id", ctrl.get);
router.patch("/:id", validate(schemas.updateUserSchema), ctrl.update);
router.delete("/:id", ctrl.remove);
router.post("/bulk-import", ctrl.bulkImport);

export default router;
