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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return !this.isDashainEvent;
      }, // Required for user events
    },
  },
  { timestamps: true }
);

const eventSchema = mongoose.model("event", event);

module.exports = eventSchema;
