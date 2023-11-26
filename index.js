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
  
app.get('/users/:userId', (req, res) => {
    // return res.send(users[req.params.userId]);
});

app.post('/users/:userId', (req, res) => {
    return res.send('POST HTTP method on user resource');
});
  
app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});
  
app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.get('/posts', (req, res) => {
    // return res.send(Object.values(posts));
  });
  
app.get('/posts/:postId', (req, res) => {
    // return res.send(posts[req.params.postId]);
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});