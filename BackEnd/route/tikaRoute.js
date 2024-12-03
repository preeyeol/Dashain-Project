const express = require("express");
const tikaRoute = express.Router();

const { verifyToken } = require("../middleware/auth");
const tikaController = require("../controller/tikaController");

tikaRoute.post("/tika", verifyToken, tikaController.sendTika);

tikaRoute.get("/tika", verifyToken, tikaController.getTikas);

module.exports = tikaRoute;
