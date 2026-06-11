const router = require("express").Router();
const movies = require("./movies.js");
const movieModel = require("./movieModel.js");
const auth = require("./auth.js");
const access = require("./accessControl.js");
const { route } = require("./userRouter.js");

const multer = require("multer");

const upload = multer({ dest: "files" });

router.post("/upload", auth, upload.single("file"), (req, res) => {
  res.status(200).send("Upload Successful");
});

router.get("/test", auth, access("Admin"), (req, res) => {
  res.send("OK");
});

router.get("/", auth, access("User"), async (req, res) => {
  try {
    res.send(await movieModel.find());
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.get("/:id", auth, access("User"), async (req, res) => {
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

router.post("/", auth, access("Admin"), async (req, res) => {
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

router.put("/:id", auth, access("Admin"), async (req, res) => {
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

router.delete("/:id", access("Admin"), auth, async (req, res) => {
  try {
    await movieModel.findByIdAndDelete(req.params.id);
    res.send(`Deleted Movie with ID: ${req.params.id}`);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
