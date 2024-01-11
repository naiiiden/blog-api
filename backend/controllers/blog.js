const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

const config = require("../utils/config");
const middleware = require("../utils/middleware");
const jwt = require("jsonwebtoken");
const tokenBlacklist = require("../utils/tokenBlacklist");

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", { username: 1 })
      .populate("comments", {
        author: 1,
        body: 1,
      });
    res.json(blogs);
  } catch (error) {
    console.log(error);
  }
});

blogRouter.post("/", async (req, res, next) => {
  const token = req.header("Authorization");

  if (tokenBlacklist.has(token.split(" ")[1])) {
    return res.status(401).json({ error: "token blacklisted" });
  }

  try {
    const { title, body, published } = req.body;

    const decodedToken = jwt.verify(token.split(" ")[1], config.SECRET);

    const user = await User.findById(decodedToken.id);

    const existingBlog = await Blog.findOne({ title });

    if (existingBlog) {
      return res.status(400).json({ error: "duplicate blog" });
    }

    const blog = new Blog({ title, body, user: user._id, published });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:blogName", async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.params.blogName })
      .populate("comments", {
        author: 1,
        body: 1,
      })
      .populate("user", {
        username: 1,
      });
    return res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
});

blogRouter.put("/:blogName", middleware.authenticateToken, async (req, res) => {
  try {
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

    const updatedBlog = await Blog.findOneAndUpdate({ title: req.params.blogName }, blog, { new: true });

    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404).json({ error: "blog not found" });
    }
  } catch (error) {
    console.log(error);
  }
});


blogRouter.post("/:blogName/comments", async (req, res) => {
  try {
    const { author, body } = req.body;

    const blog = await Blog.findOne({ title: req.params.blogName });

    const comment = new Comment({ author, body, blog: blog });

    const savedComment = await comment.save();

    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();

    res.json(savedComment);
  } catch (error) {
    console.log(error);
  }
});

blogRouter.delete(
  "/:blogName/comments/:commentId",
  middleware.authenticateToken,
  async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.commentId);
      res.status(204).end();
    } catch (error) {
      console.log(error);
    }
  }
);

blogRouter.delete(
  "/:blogName",
  middleware.authenticateToken,
  async (req, res) => {
    try {
      await Blog.findOneAndDelete({ title: req.params.blogName });
      res.status(204).end();
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = blogRouter;
