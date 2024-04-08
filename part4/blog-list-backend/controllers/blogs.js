const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  req.body.user = user._id;

  const blog = new Blog(req.body);
  await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  res.status(201).json(blog);
});

blogRouter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(req.params.id);

  if (user._id.toString() !== blog.user.toString()) {
    return res.status(401).json({ error: "insufficient access rights" });
  }

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
