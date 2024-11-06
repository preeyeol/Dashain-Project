const express = require("express");
const userRoute = express.Router();

const { signUp, login, getUsers } = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const familyTree = require("../controller/familyController");

userRoute.post("/signup", signUp);
userRoute.post("/login", login);
userRoute.get("/", verifyToken, getUsers);
userRoute.post("/fam", verifyToken, familyTree.addFamily);

module.exports = userRoute;
