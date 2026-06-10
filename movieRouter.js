const router = require("express").Router();
const movies = require("./movies.js");
const movieModel = require("./movieModel.js");

router.get("/", async (req, res) => {
  try {
    res.send(await movieModel.find());
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (movie) {
      res.send(movie);
    } else {
      res.status(404).send("Movie not found");
    }
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMovie = new movieModel({
      title: data.title,
      releaseYear: data.releaseYear,
      rating: data.rating,
      genre: data.genre,
      director: data.director,
      description: data.description,
    });
    await newMovie.save();
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);

    if (!movie) return res.status(400).send("Movie Not Found");

    await movieModel.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        rating: req.body.rating,
        genre: req.body.genre,
        director: req.body.director,
        description: req.body.description,
      },
    });
    res.send("Movie Updated");
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await movieModel.findByIdAndDelete(req.params.id);
    res.send(`Deleted Movie with ID: ${req.params.id}`);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
