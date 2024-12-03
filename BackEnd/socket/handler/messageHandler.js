const msgSchema = require("../../model/msgSchema");
const eventSchema = require("../../model/eventSchema");

const msgHandler = (io, socket) => {
  socket.on("send-msg", async (data) => {
    try {
      const { eventId, content } = data;

      const event = await eventSchema.findById(eventId);
      if (!event || event.participants.includes(socket.user._id)) {
        console.log("Hhh");
        socket.emit("error", { message: "Not authorized to send messages" });
        return;
      }

      const message = new msgSchema({
        eventId,
        sender: socket.user._id,
        content,
      });
      await message.save(),
        await message.populate("sender", "name email profilePicture");

      io.to(`event:${eventId}`).emit("new-message", message);
    } catch (error) {
      socket.emit("error", { message: "Error sending message" });
    }
  });
};

module.exports = msgHandler;
