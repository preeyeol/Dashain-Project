const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");

const catchAsync = require("../utils/catchAsync");
const {
  sendEmailCode,
  welcomeEmail,
  passwordReset,
  resetSuccessful,
} = require("../middleware/emailVerify/email");

const sendSMS = require("../middleware/smsVerify/sms");
const createOTP = require("../utils/otp");

const signUp = catchAsync(async (req, res) => {
  try {
    const { email, username, password, confirmPassword, phone } = req.body;

    if (validator.isEmail(email)) {
      const user = await userSchema.findOne({ email: email });

      if (user) {
        return res.status(400).json({ error: "Email is already registered" });
      }
    } else {
      res.json({ err: "Invalid email format" });
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        msg: "Passwords do not match",
      });
    }
    const usersname = await userSchema.findOne({ username: username });
    if (usersname) {
      return res.json({ msg: "Username already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userAdd = new userSchema({
      email: email,
      username: username,
      password: hashPassword,
      phone: phone,
    });

    const newUser = await userAdd.save();
    res.status(200).json({ msg: "You have Signed Up", newUser });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server Error" });
  }
});

const sendOTP = catchAsync(async (req, res) => {
  const { email, phone } = req.body;

  const otp = createOTP();

  const user = await userSchema.findOne({
    $or: [{ email }, { phone }],
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  user.otp = otp;
  user.otpExpiration = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  await user.save();

  if (email) {
    try {
      await sendEmailCode(user.email, otp);
      return res
        .status(200)
        .json({ success: true, message: `OTP sent to your email: ${email}` });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP to email.",
      });
    }
  }

  if (phone) {
    try {
      await sendSMS(user.phone, otp);
      return res
        .status(200)
        .json({ success: true, message: `OTP sent to your phone: ${phone}` });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP to phone.",
      });
    }
  }

  return res.status(400).json({
    success: false,
    message: "Please provide either an email or phone to send OTP.",
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { email, otp } = req.body;

  const user = await userSchema.findOne({ email: email, otp: otp });

  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or Expired Code" });
  }

  const isOtpValid = user.otp === otp && Date.now() < user.otpExpiration;

  console.log("hggikj");
  if (!isOtpValid) {
    console.log("hggikj");
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  user.isEmailVerified = true;

  user.otp = undefined;
  user.otpExpiration = undefined;

  await user.save();
  await welcomeEmail(user.email, user.username);
  res
    .status(200)
    .json({ success: true, message: "Email verified successfully" });
});

const verifyPhone = catchAsync(async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await userSchema.findOne({ phone: phone, otp: otp });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isOTPValid = user.otp === otp && Date.now() < user.otpExpiration;
    if (!isOTPValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }
    user.isNumberVerified = true;

    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

const accountVerify = catchAsync(async (req, res) => {
  const { email, phone } = req.body;
  const user = await userSchema.findOne({
    $or: [{ email }, { phone }],
  });
  console.log(user);

  if (!user.isEmailVerified == true && !user.isNumberVerified == true) {
    return res.status(400).json({
      message:
        "Email and Number,both must be verified for account verification",
    });
  }

  if (user.isAccountVerified == true) {
    return res.status(400).json({ message: "Account Already Verified" });
  }

  user.isAccountVerified = true;

  user.otp = undefined;
  user.otpExpiration = undefined;
  await user.save();
  res.status(200).json({ message: "Account Verified" });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await userSchema.findOne({ email: email }).select("+password");
  console.log(user);
  if (!user) {
    return res.status(400).json({ error: "User Not Found" });
  }

  if (user.isVerified === false) {
    return res
      .status(400)
      .json({ success: false, message: "Please verify first" });
  }

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return res.status(400).json({
      error: "Incorrect email or password",
    });
  }
  const accessToken = jwt.sign({ id: user._id }, process.env.jwt_secret, {
    issuer: process.env.jwt_issuer,
    expiresIn: process.env.jwt_expiresIn,
  });
  res.status(200).json({
    msg: "Login Succesful",
    accessToken: accessToken,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await userSchema.findOne({ email });
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json({ success: true, message: "User not found with this email" });
  }

  if (!user.isAccountVerified == true) {
    return res.status(400).json({ message: "Account must be verified" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  console.log(token);
  const tokenExpiresIn = Date.now() + 10 * 60 * 1000;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  user.resetPasswordToken = hashToken;
  user.resetPasswordExpiresIn = tokenExpiresIn;

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/resetPassword/${token}`;

  await user.save();

  await passwordReset(user.email, user.username, resetUrl);

  res.status(200).json({ msg: "Reset URL sent", resetUrl });
});

const resetPassword = catchAsync(async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { token } = req.params;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userSchema.findOne({
    resetPasswordToken: hashToken,
    resetPasswordExpiresIn: { $gt: Date.now() },
  });

  console.log(user);

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresIn = undefined;

  await user.save();

  await resetSuccessful(user.email, user.username);
  res.status(200).json({
    message: "Password updated successfully! Please log in.",
  });
});

const profileUp = catchAsync(async (req, res) => {
  try {
    const user = req.user;
    console.log(req.file);
    console.log(user);
    const profileUser = await userSchema.findById(user._id);
    console.log(profileUser);

    profileUser.profile = req.file.filename;

    await profileUser.save();

    res.json({ msg: "Profile Updated", profileUser });
  } catch (err) {
    console.log("Server error");
  }
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userSchema.find({});

  res.json(users);
});

module.exports = {
  signUp,
  sendOTP,
  verifyEmail,
  verifyPhone,
  accountVerify,
  login,
  forgetPassword,
  resetPassword,
  getUsers,
  profileUp,
};
