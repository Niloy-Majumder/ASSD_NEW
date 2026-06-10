const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseYear: Number,
  genre: String,
  rating: Number,
  description: String,
});

module.exports = mongoose.model("movie", movieSchema);
