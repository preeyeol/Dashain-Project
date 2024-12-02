const mongoose = require("mongoose");

const photo = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const photoSchema = mongoose.model("photo", photo);

module.exports = photoSchema;
