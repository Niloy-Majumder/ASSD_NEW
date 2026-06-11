const bodyParser = require("body-parser");
const express = require("express");
const FileSystem = require("fs");
const path = require("path");
const cors = require("cors");
const movieRouter = require("./movieRouter.js");
const userRouter = require("./userRouter.js");
require("dotenv").config();

const { default: mongoose } = require("mongoose");

const app = express();
const port = 5000;

mongoose
  .connect("mongodb://localhost:27017/movies_DB")
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.error("Connection Refused", err);
  });

app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use(express.static(path.join(__dirname, "public")));

function logger(req, res, next) {
  try {
    console.log(`${req.headers.host} ${req.headers.age} ${req.headers.origin}`);
    next();
  } catch (error) {}
}

app.use("/user", userRouter);
app.use("/movies", movieRouter);

app.listen(port, () => {
  console.log(`Basic Express App is running at http://localhost:${port}`);
});
