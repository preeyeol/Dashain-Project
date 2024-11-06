const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  confirmPassword: String,
  familyMembers: [
    {
      memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      relationship: {
        type: String,
        enum: [
          "brother",
          "sister",
          "father",
          "mother",
          "spouse",
          "son",
          "daughter",
          "other",
        ],
      },
    },
  ],
  profilePicture: String,
  createdAt: { type: Date, default: new Date() },
});

const userSchema = mongoose.model("user", user);

module.exports = userSchema;
