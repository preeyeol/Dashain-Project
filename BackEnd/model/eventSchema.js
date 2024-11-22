const mongoose = require("mongoose");

const event = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: String,
    isDashainEvent: {
      type: Boolean,
      default: false, // True for predefined Dashain events
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

      // Required for user events
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const eventSchema = mongoose.model("event", event);

module.exports = eventSchema;
