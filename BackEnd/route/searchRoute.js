const express = require("express");
const searchRoute = express.Router();

const search = require("../controller/search");
const { verifyToken } = require("../middleware/auth");

searchRoute.get("/search", verifyToken, search);

module.exports = searchRoute;
