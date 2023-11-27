const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoDb = `mongodb+srv://dbUser:${process.env.DB_PASSWORD}@cluster0.6gnwje6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const User = require('./models/user');
const Blog = require('./models/blog');

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { username, password } = req.body;

    const user = new User({ username, password });

    const savedUser = await user.save();
    res.json(savedUser);
});
  
app.get('/users/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId);
    return user 
        ? res.json(user)
        : res.status(404).end();
});
  
app.put('/users/:userId', (req, res) => {
    const { username, password } = req.body;

    const user = { username, password };

    User.findByIdAndUpdate(req.params.userId, user, { new: true })
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch(error => next(error))
});
  
app.delete('/users/:userId', async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).end();
});

app.get('/blogs', async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

app.post('/blogs', async (req, res) => {
    const { title, body, author, published } = req.body;

    const blog = new Blog({ title, body, author, published });

    const savedBlog = await blog.save();
    res.json(savedBlog);
});
  
app.get('/blogs/:blogId', async (req, res) => {
    const blog = await Blog.findById(req.params.blogId);
    return blog 
        ? res.json(blog)
        : res.status(404).end();
});

app.put('/blogs/:blogId', async (req, res) => {
    const { title, body, author, published, comments } = req.body;

    const blog = { title, body, author, published, comments };

    Blog.findByIdAndUpdate(req.params.blogId, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog)
        })
        .catch(error => next(error))
});

app.delete('/blogs/:blogId', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.blogId);
    res.status(204).end();
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});