const userSchema = require("../model/userSchema");
const jwt = require("jsonwebtoken");

const socketVerify = async (socket, next) => {
  const token = socket.handshake.headers.auth;
  if (!token) {
    return next(new Error("invalid token"));
  }
  const decoded = jwt.verify(token, process.env.jwt_secret);
  const user = await userSchema.findById(decoded.id);
  socket.user = user;
  next();
};

module.exports = socketVerify;
