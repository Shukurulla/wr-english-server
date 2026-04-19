import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import * as ctrl from "./auth.controller.js";
import * as schemas from "./auth.validation.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { loginLimiter } from "../../middlewares/rate-limit.middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const avatarStorage = multer.diskStorage({
  destination: path.join(__dirname, "..", "..", "..", "uploads", "avatars"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(ext && mime ? null : new Error("Only image files allowed"), ext && mime);
  },
});

const router = Router();

router.post("/register", loginLimiter, validate(schemas.registerSchema), ctrl.registerCtrl);
router.post("/login", loginLimiter, validate(schemas.loginSchema), ctrl.loginCtrl);
router.post("/refresh", validate(schemas.refreshSchema), ctrl.refreshCtrl);
router.post("/logout", requireAuth, ctrl.logoutCtrl);
router.get("/me", requireAuth, ctrl.meCtrl);
router.post(
  "/change-password",
  requireAuth,
  validate(schemas.changePasswordSchema),
  ctrl.changePasswordCtrl
);
router.post("/avatar", requireAuth, avatarUpload.single("avatar"), ctrl.uploadAvatarCtrl);

export default router;
