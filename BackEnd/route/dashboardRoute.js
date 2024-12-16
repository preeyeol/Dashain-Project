const express = require("express");
const dashRoute = express.Router();

const dashboardController = require("../controller/dashController");

dashRoute.get("/", dashboardController.getDashboardData);
dashRoute.get("/photoStats", dashboardController.getPhotoStatistics);
dashRoute.get("/msgStats", dashboardController.msgStats);
dashRoute.get("/eventDate", dashboardController.eventPerDate);

module.exports = dashRoute;
