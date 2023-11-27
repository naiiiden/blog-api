const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogRouter.post('/', async (req, res) => {
    const { title, body, author, published } = req.body;

    const blog = new Blog({ title, body, author, published });

    const savedBlog = await blog.save();
    res.json(savedBlog);
});
  
blogRouter.get('/:blogId', async (req, res) => {
    const blog = await Blog.findById(req.params.blogId);
    return blog 
        ? res.json(blog)
        : res.status(404).end();
});

blogRouter.put('/:blogId', (req, res) => {
    const { title, body, author, published, comments } = req.body;

    const blog = { title, body, author, published, comments };

    Blog.findByIdAndUpdate(req.params.blogId, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog)
        })
        .catch(error => next(error))
});

blogRouter.delete('/:blogId', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.status(204).end();
});

module.exports = blogRouter;