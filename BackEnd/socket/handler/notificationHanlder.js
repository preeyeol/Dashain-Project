const notificationSchema = require("../../model/notificationSchema");
const userSchema = require("../../model/userSchema");

const notificationHanlder = (io, socket) => {
  socket.on("send-family-request", async (data) => {
    const { recipient } = data;
    console.log(recipient);

    const notification = new notificationSchema({
      recipient: recipient,
      sender: socket.user._id,
      type: "FAMILY_REQUEST",
    });

    await notification.save();
    await notification.populate("sender", "username email profilePicture");

    console.log(notification);
    io.to(`user-${recipient}`).emit("new-notification", notification);
  });

  socket.on("respond-family-request", async (data) => {
    const { notificationId, accept } = data;

    const notification = await notificationSchema
      .findById(notificationId)
      .populate("sender", "name email profilePicture")
      .populate("recipient", "name email profilePicture");

    if (!notification) {
      socket.emit("error", { message: "Notification not found" });
      return;
    }

    notification.status = accept ? "ACCEPTED" : "REJECTED";
    await notification.save();

    if (accept) {
      // Add family members
      const [sender, recipient] = await Promise.all([
        userSchema.findById(notification.sender._id),
        userSchema.findById(notification.recipient._id),
      ]);

      sender.familyMembers.push(recipient._id);
      recipient.familyMembers.push(sender._id);

      await Promise.all([sender.save(), recipient.save()]);
    }

    io.to(`user-${notification.sender._id.toString()}`).emit(
      "family-request-response",
      {
        notification,
        accepted: accept,
      }
    );

    io.to(`user:${notification.recipient._id}`).emit(
      "family-request-response",
      {
        notification,
        accepted: accept,
      }
    );
  });
};

module.exports = notificationHanlder;
