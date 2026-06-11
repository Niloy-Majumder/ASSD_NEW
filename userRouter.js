const router = require("express").Router();
const userModel = require("./userModel.js");
const bcrypt = require("bcrypt");
const { signJwt } = require("./jwt.js");

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).send("Invalid Fields");
  }

  const hashedPassword = await bcrypt.hash(password, 7);

  const user = new userModel({
    name: name,
    email: email,
    password: hashedPassword,
    role: role,
  });

  await user.save();

  res.status(200).send("New User Created");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Invalid Fields");
  }

  const user = await userModel.findOne({ email: email });

  if (!user) {
    res.status(404).send("User Not Registered");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    res.status(400).send("Invalid Password");
  }

  const token = signJwt({ user: user.name, role: user.role });

  res.status(200).send(token);
});

module.exports = router;
