const mongoose = require("mongoose");
const { resetPassword } = require("../middleware/emailVerify/email");

const user = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  confirmPassword: String,
  familyMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  profilePicture: { type: String, default: "" },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: String,
  createdAt: { type: Date, default: new Date() },
  resetPasswordToken: String,
  resetPasswordExpiresIn: Date,
});

const userSchema = mongoose.model("user", user);

module.exports = userSchema;
