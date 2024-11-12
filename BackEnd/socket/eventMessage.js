const messageSchema = require("../model/msgSchema");
const eventSchema = require("../model/eventSchema");

function message(io, socket) {
  socket.on("join-event", async (data) => {
    const event = await eventSchema.findById(data.eventId);
    console.log(event);
  });
}

module.exports = message;
