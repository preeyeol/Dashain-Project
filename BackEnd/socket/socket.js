const tikaSchema = require("../model/tikaSchema");

function socketHandle(io) {
  io.on("connection", (socket) => {
    console.log(`${socket.user.username} is connected`);

    const errorHandler = (err) => {
      socket.emit("error", {
        message: err.msg || "Invalid Message",
        status: err.statusCode || 400,
      });
    };

    socket.on("notify", async ({ receiverId, senderId }) => {
      // const receiver = await tikaSchema.findOne({ receiverId: receiverId });
      // const sender = await tikaSchema.findOne({ senderId: senderId });
      if (sender)
        socket.broadcast.emit("notification", {
          msg: `${socket.senderId.username} sent tika to ${socket.receiverId.username}`,
        });
    });
  });
}

module.exports = socketHandle;
