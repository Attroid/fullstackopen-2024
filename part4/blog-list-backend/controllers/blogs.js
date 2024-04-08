const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const user = await User.findOne({});
  req.body.user = user._id;

  const blog = new Blog(req.body);
  await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

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
