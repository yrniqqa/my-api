import Message from "../models/Message.js";
import { sendEmail, newMessageNotification, replyEmail } from "../utils/sendEmail.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ data: messages, total: messages.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    if (!message.read) { message.read = true; await message.save(); }
    res.json({ data: message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "Name, email and message are required" });
    const msg = await Message.create({ name, email, subject, message });
    try {
      await sendEmail(newMessageNotification(msg));
    } catch (emailErr) {
      console.warn("Email notification failed:", emailErr.message);
    }
    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const replyMessage = async (req, res) => {
  try {
    const { body } = req.body;
    if (!body) return res.status(400).json({ message: "Reply body is required" });
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    msg.replies.push({ body });
    msg.replied = true;
    await msg.save();
    try {
      await sendEmail(replyEmail(msg.email, msg.name, body));
    } catch (emailErr) {
      console.warn("Reply email failed:", emailErr.message);
    }
    res.json({ message: "Reply sent", data: msg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message not found" });
    res.json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const [total, unread, replied] = await Promise.all([
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Message.countDocuments({ replied: true }),
    ]);
    res.json({ total, unread, replied });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
