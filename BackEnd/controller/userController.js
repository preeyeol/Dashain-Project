const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");
const catchAsync = require("../utils/catchAsync");
const {
  sendVerificationCode,
  welcomeEmail,
  passwordReset,
  resetSuccessful,
} = require("../middleware/emailVerify/email");

const signUp = catchAsync(async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

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
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const userAdd = new userSchema({
      email: email,
      username: username,
      password: hashPassword,
      verificationCode,
    });

    const newUser = await userAdd.save();
    sendVerificationCode(newUser.email, verificationCode);

    res.status(200).json({ msg: "You have Signed Up", newUser });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server Error" });
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  const { code } = req.body;
  const user = await userSchema.findOne({
    verificationCode: code,
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or Expired Code" });
  }

  (user.isVerified = true), (user.verificationCode = undefined);

  await user.save();
  await welcomeEmail(user.email, user.username);
  res
    .status(200)
    .json({ success: true, message: "Email verified successfully" });
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
  verifyEmail,
  login,
  forgetPassword,
  resetPassword,
  getUsers,
  profileUp,
};
