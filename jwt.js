const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

function signJwt(payload) {
  return jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: "2h" });
}

function verifyJwt(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}

module.exports = {
  signJwt,
  verifyJwt,
};
