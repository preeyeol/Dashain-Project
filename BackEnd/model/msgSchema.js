const mongoose = require("mongoose");

const message = mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

const messageSchema = mongoose.model("message", message);

module.exports = messageSchema;
