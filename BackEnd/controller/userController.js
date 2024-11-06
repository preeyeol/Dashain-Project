const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const signUp = async (req, res) => {
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

    const userAdd = new userSchema({
      email: email,
      username: username,
      password: hashPassword,
    });

    const newUser = await userAdd.save();

    res.status(200).json({ msg: "You have Signed Up", newUser });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email }).select("+password");
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
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
  } catch (err) {
    console.log(err);
    res.status(404).json({
      msg: "Server Error",
    });
  }
};

const profileUp = async (req, res) => {
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
};

const getUsers = async (req, res) => {
  const users = await userSchema.find({});

  res.json(users);
};

module.exports = { signUp, login, getUsers, profileUp };
