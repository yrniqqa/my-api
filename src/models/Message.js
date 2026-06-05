import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  body:      { type: String, required: true },
  sentAt:    { type: Date, default: Date.now },
}, { _id: false });

const messageSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: { type: String, default: "" },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  replies: [replySchema],
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);
