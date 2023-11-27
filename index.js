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

const userRouter = require('./controllers/user');
const blogRouter = require('./controllers/blog');

app.use('/users', userRouter);
app.use('/blogs', blogRouter);

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});