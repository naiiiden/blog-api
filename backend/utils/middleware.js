const jwt = require("jsonwebtoken");
const config = require("./config");

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.log("error message: ", error.message);

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }

  next();
};

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "missing token" });
  }

  try {
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5haWRlbiIsImlkIjoiNjU4N2Y3NThjMjNlYjBmYTU2YzI4Y2Y1IiwiaWF0IjoxNzA0OTAzMTQ5LCJleHAiOjE3MDQ5MDY3NDl9.Q3Z7ToEElL-dlCrFJ5JhSbxMnUeVE6bi01e6XXvYbRA
    // split removes "Bearer "
    const decodedToken = jwt.verify(token.split(" ")[1], config.SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("error: ", error);
    res.status(401).json({ error: "invalid token" });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  authenticateToken,
};
