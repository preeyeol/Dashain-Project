// const tikaSchema = require("../model/tikaSchema");
const msgHandler = require("../socket/handler/messageHandler");
const notificationHanlder = require("../socket/handler/notificationHanlder");

function socketHandle(io) {
  io.on("connection", (socket) => {
    console.log(`${socket.user.username} is connected`);
    console.log(socket.user._id);
    socket.join(`user-${socket.user._id.toString()}`);
    console.log(
      `${
        socket.user.username
      } has joined in room user-${socket.user._id.toString()}`
    );

    const errorHandler = (err) => {
      socket.emit("error", {
        message: err.msg || "Invalid Message",
        status: err.statusCode || 400,
      });
    };

    socket.on("join-event", (eventId) => {
      socket.join(`event:${eventId}`);
      console.log(`${socket.user.username} has joined in eventId ${eventId}`);
    });

    msgHandler(io, socket);

    notificationHanlder(io, socket);
  });
}

module.exports = socketHandle;
