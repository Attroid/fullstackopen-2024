const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.status(201).json(blog);
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogRouter;
