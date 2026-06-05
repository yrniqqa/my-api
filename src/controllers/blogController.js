import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  try {
    const filter = req.query.published === "true" ? { published: true } : {};
    const blogs  = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ data: blogs, total: blogs.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Post not found" });
    blog.views += 1;
    await blog.save();
    res.json({ data: blog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ data: blog });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ message: "Post not found" });
    res.json({ data: blog });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
