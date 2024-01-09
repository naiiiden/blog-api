const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

const config = require("../utils/config");
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1 })
    .populate("comments", {
      author: 1,
      body: 1,
    });
  res.json(blogs);
});

blogRouter.post("/", async (req, res, next) => {
  try {
    const { title, body, published } = req.body;

    const decodedToken = jwt.verify(getTokenFrom(req), config.SECRET);

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ title, body, user: user._id, published });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// REWRITE THIS L8R
blogRouter.get("/:blogId", async (req, res) => {
  const blog = await Blog.findById(req.params.blogId)
    .populate("comments", {
      author: 1,
      body: 1,
    })
    .populate("user", {
      username: 1,
    });
  return blog ? res.json(blog) : res.status(404).end();
});

blogRouter.put("/:blogId", (req, res, next) => {
  const { title, body, published } = req.body;
  // same as
  // const title = req.body;
  // const body = req.body;
  // const published = req.body;

  const blog = { title, body, published };
  // same as
  // const blog = {
  //     title: title,
  //     body: body,
  //     published: published,
  // };

  Blog.findByIdAndUpdate(req.params.blogId, blog, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((error) => next(error));
});

blogRouter.post("/:blogId/comments", async (req, res, next) => {
  const { author, body } = req.body;

  const blog = await Blog.findById(req.params.blogId);

  const comment = new Comment({ author, body, blog: blog });

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  res.json(savedComment);
});

blogRouter.delete("/:blogId/comments/:commentId", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.status(204).end();
});

blogRouter.delete("/:blogId", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.blogId);
  res.status(204).end();
});

module.exports = blogRouter;
