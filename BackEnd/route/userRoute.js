const express = require("express");
const userRoute = express.Router();

const {
  signUp,
  verifyEmail,
  login,
  forgetPassword,
  resetPassword,
  getUsers,
} = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const familyTree = require("../controller/familyController");
const {
  validate,
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
} = require("../middleware/validation");
const { verify } = require("jsonwebtoken");

userRoute.post("/signup", validateRegistration(), validate, signUp);
userRoute.post("/verifyEmail", verifyEmail);
userRoute.post("/forgotPassword", forgetPassword);
userRoute.post("/resetPassword/:token", resetPassword);
userRoute.post("/login", validateLogin(), validate, login);
userRoute.get("/", verifyToken, getUsers);
userRoute.post(
  "/fam",
  verifyToken,
  validateAddFamily(),
  validate,
  familyTree.addFamily
);
userRoute.get("/fam", verifyToken, familyTree.getFamily);
userRoute.delete(
  "/fam/:famId",
  verifyToken,
  validateDeleteFamily(),
  validate,
  familyTree.deleteFam
);

module.exports = userRoute;
