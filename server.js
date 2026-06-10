const bodyParser = require("body-parser");
const express = require("express");
const FileSystem = require("fs");
const path = require("path");
const cors = require("cors");
const movieRouter = require("./movieRouter.js");
const { default: mongoose } = require("mongoose");

// require("dotenv").config();

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

app.use("/movies", logger, movieRouter);

app.listen(port, () => {
  console.log(`Basic Express App is running at http://localhost:${port}`);
});
