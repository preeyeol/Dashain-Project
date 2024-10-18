const eventSchema = require("../model/eventSchema");

const getDashainEvents = async (req, res) => {
  try {
    const dashainEvents = await eventSchema.find({ isDashainEvent: true });
    res.status(200).json(dashainEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const event = new eventSchema({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      userId: req.body.userId, // User's ID from JWT or session
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const events = await eventSchema.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashainEvents, createEvent, getEvent };
