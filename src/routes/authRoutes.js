import { Router } from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/register", register);
router.post("/login",    authLimiter, login);
router.get("/me",        protect, getMe);

export default router;
