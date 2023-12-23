const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });

  const savedUser = await user.save();
  res.json(savedUser);
});

userRouter.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  return user ? res.json(user) : res.status(404).end();
});

userRouter.put("/:userId", (req, res) => {
  const { username, password } = req.body;

  const user = { username, password };

  User.findByIdAndUpdate(req.params.userId, user, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => next(error));
});

userRouter.delete("/:userId", async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.status(204).end();
});

module.exports = userRouter;
