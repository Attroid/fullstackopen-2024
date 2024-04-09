const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "token invalid" });
  }

  next(err);
};

const userExtractor = async (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    const token = auth.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: "token owner not found" });
    }

    req.user = user;
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
