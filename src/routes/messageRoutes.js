import { Router } from "express";
import {
  getMessages, getMessage,
  createMessage, replyMessage,
  deleteMessage, getStats,
} from "../controllers/messageController.js";
import { protect, adminOnly } from "../middleware/auth.js";
import { messageLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/",           messageLimiter, createMessage);
router.get("/",            protect, adminOnly, getMessages);
router.get("/stats",       protect, adminOnly, getStats);
router.get("/:id",         protect, adminOnly, getMessage);
router.post("/:id/reply",  protect, adminOnly, replyMessage);
router.delete("/:id",      protect, adminOnly, deleteMessage);

export default router;
