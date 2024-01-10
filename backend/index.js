const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoDb = `mongodb+srv://dbUser:${config.DB_PASSWORD}@cluster0.6gnwje6.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const userRouter = require("./controllers/user");
const blogRouter = require("./controllers/blog");
const loginRouter = require("./controllers/login");
const logoutRouter = require("./controllers/logout");

app.use(middleware.requestLogger);

app.use("/users", userRouter);
app.use("/blogs", blogRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
