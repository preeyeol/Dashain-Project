const express = require("express");

const profileRoute = express.Router();

const profileController = require("../controller/profileController");
const { verifyToken } = require("../middleware/auth");

profileRoute.get("/profile", verifyToken, profileController.updateProfile);

module.exports = profileRoute;
