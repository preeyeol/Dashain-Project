const mongoose = require("mongoose");

const tika = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
});

const tikaSchema = mongoose.model("tika", tika);

module.exports = tikaSchema;
