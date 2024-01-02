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

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
