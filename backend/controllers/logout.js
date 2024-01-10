const logoutRouter = require("express").Router();

logoutRouter.post("/", async (req, res) => {
  const token = req.header("Authorization");

  if (token) {
    console.log(1, token);
    res.status(200).json({ token });
  }
});

module.exports = logoutRouter;
