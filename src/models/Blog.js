import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  tags:      [{ type: String }],
  published: { type: Boolean, default: false },
  views:     { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
