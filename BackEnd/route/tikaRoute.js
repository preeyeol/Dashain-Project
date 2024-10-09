const express = require("express");
const tikaRoute = express.Router();

const { verifyToken } = require("../middleware/auth");
const tikaExchange = require("../controller/tikaController");

tikaRoute.post("/tika", verifyToken, tikaExchange);

module.exports = tikaRoute;
