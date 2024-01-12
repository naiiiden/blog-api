const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate("blogs", {
      title: 1,
      published: 1,
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, passwordHash });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    return user ? res.json(user) : res.status(404).end();
  } catch (error) {
    console.log(error);
  }
});

userRouter.put("/:userId", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = { username, password };

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, user, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

userRouter.delete("/:userId", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
