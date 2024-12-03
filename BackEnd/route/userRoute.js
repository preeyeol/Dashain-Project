const express = require("express");
const userRoute = express.Router();

const { signUp, login, getUsers } = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const familyTree = require("../controller/familyController");
const {
  validate,
  validateRegistration,
  validateLogin,
} = require("../middleware/validation");

userRoute.post("/signup", validateRegistration(), validate, signUp);
userRoute.post("/login", validateLogin(), validate, login);
userRoute.get("/", verifyToken, getUsers);
userRoute.post("/fam", verifyToken, familyTree.addFamily);
userRoute.get("/fam", verifyToken, familyTree.getFamily);
userRoute.delete("/:famId", verifyToken, familyTree.deleteFam);

module.exports = userRoute;
