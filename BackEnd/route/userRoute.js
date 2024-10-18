const express = require("express");
const userRoute = express.Router();

const { signUp, login, getUsers } = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");

userRoute.post("/signup", signUp);
userRoute.post("/login", login);
userRoute.get("/", verifyToken, getUsers);

module.exports = userRoute;
