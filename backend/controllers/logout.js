const logoutRouter = require("express").Router();
const tokenBlacklist = require("../utils/tokenBlacklist");

logoutRouter.post("/", async (req, res) => {
  const token = req.header("Authorization");

  if (token) {
    console.log(1, token);
    tokenBlacklist.add(token.split(" ")[1]);
    console.log(5, tokenBlacklist);
    res.status(200).json({ token });
  }
});

module.exports = logoutRouter;
