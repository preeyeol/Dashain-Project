const express = require("express");
const tikaRoute = express.Router();

const { verifyToken } = require("../middleware/auth");
const tikaController = require("../controller/tikaController");
const { validate, validateSendTika } = require("../middleware/validation");

tikaRoute.post(
  "/tika",
  verifyToken,
  validateSendTika(),
  validate,
  tikaController.sendTika
);

tikaRoute.get("/tika", verifyToken, tikaController.getTikas);

module.exports = tikaRoute;
