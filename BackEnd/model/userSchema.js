const mongoose = require("mongoose");
// const { resetPassword } = require("../middleware/emailVerify/email");

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
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isNumberVerified: {
    type: Boolean,
    default: false,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: String,
  phone: { type: String, unique: true, required: true },
  otp: String,
  otpExpiration: Date,
  createdAt: { type: Date, default: new Date() },
  resetPasswordToken: String,
  resetPasswordExpiresIn: Date,
});

const userSchema = mongoose.model("user", user);

module.exports = userSchema;
