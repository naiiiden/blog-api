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
const Post = require('./models/post');

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

app.get('/posts', async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
});

app.post('/posts', async (req, res) => {
    const { title, text, author, published } = req.body;

    const post = new Post({ title, text, author, published });

    const savedPost = await post.save();
    res.json(savedPost);
});
  
app.get('/posts/:postId', async (req, res) => {
    const post = await Post.findById(req.params.postId);
    return post 
        ? res.json(post)
        : res.status(404).end();
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});