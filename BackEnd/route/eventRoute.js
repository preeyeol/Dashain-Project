const express = require("express");
const eventRoute = express.Router();
const {
  createEvent,
  getEvent,
  getDashainEvents,
  joinEvent,
} = require("../controller/eventController");
const { verifyToken } = require("../middleware/auth");

eventRoute.post("/events", verifyToken, createEvent);
eventRoute.get("/events", verifyToken, getEvent);
eventRoute.get("/events/dashain", getDashainEvents);
eventRoute.post("/events/:eventId/join", verifyToken, joinEvent);

module.exports = eventRoute;
