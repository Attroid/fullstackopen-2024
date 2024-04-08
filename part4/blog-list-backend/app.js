const express = require("express");
require("express-async-errors");
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const config = require("./utils/config");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((err) => {
    logger.error("error connecting to MongoDB:", err.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
