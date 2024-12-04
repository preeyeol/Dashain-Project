const msgSchema = require("../../model/msgSchema");
const eventSchema = require("../../model/eventSchema");

const msgHandler = (io, socket) => {
  socket.on("send-msg", async (data) => {
    const { eventId, message } = data;

    const event = await eventSchema.findById(eventId);
    if (!event || !event.participants.includes(socket.user._id)) {
      socket.emit("error", { message: "Not authorized to send messages" });
      return;
    }
    console.log(event);

    const newMessage = new msgSchema({
      eventId,
      sender: socket.user._id,
      message,
    });
    await newMessage.save(),
      await newMessage.populate("sender", "name email profilePicture");

    console.log(newMessage);

    io.to(`event:${eventId}`).emit("new-message", newMessage);
  });
};

module.exports = msgHandler;
