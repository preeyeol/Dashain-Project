const express = require("express");
const userRoute = express.Router();

const { signUp, login, getUsers } = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const familyTree = require("../controller/familyController");
const {
  validate,
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
} = require("../middleware/validation");

userRoute.post("/signup", validateRegistration(), validate, signUp);
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
