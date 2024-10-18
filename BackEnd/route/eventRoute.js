const express = require("express");
const eventRoute = express.Router();
const {
  createEvent,
  getEvent,
  getDashainEvents,
} = require("../controller/eventController");
const { verifyToken } = require("../middleware/auth");

eventRoute.post("/events", verifyToken, createEvent);
eventRoute.get("/events", verifyToken, getEvent);
eventRoute.get("/events/dashain", getDashainEvents);

module.exports = eventRoute;
