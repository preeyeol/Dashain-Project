const eventSchema = require("../model/eventSchema");
const userSchema = require("../model/userSchema");

const getDashainEvents = async (req, res) => {
  try {
    const dashainEvents = await eventSchema.find({ isDashainEvent: true });
    res.status(200).json(dashainEvents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  try {
    console.log(req.user);
    const event = new eventSchema({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      creator: req.user._id,
    });
    event.participants.push(req.user._id);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getEvent = async (req, res) => {
  try {
    const events = await eventSchema.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const joinEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user.id;

  console.log(eventId);
  console.log(userId);

  const isEventExist = await eventSchema.findById(eventId);
  console.log(isEventExist);

  if (!isEventExist) {
    return res.status(404).json({ msg: "Event not found" });
  }
  if (isEventExist.participants.includes(userId)) {
    return res.status(400).json({ msg: "User is already a participant" });
  }

  const creatorInfo = await userSchema.findOne({
    _id: isEventExist.creator,
  });
  console.log(userId);
  console.log(creatorInfo.familyMembers);
  console.log(creatorInfo.familyMembers.includes(userId));
  if (!creatorInfo.familyMembers.includes(userId)) {
    return res
      .status(403)
      .json({ msg: "You are not a family member of event creator" });
  }
  isEventExist.participants.push(userId);
  await isEventExist.save();
  res.status(200).json({ msg: "User joined the event successfully" });
};

const eventDetails = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await eventSchema.findById(eventId);

    res.status(200).json({ msg: "Event Details", event });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Server Error" });
  }
};
const unjoinedEvents = async (req, res) => {
  try {
    const currentUser = await userSchema.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    const events = await eventSchema
      .find({
        creator: { $in: currentUser.familyMembers },
        participants: { $ne: currentUser._id }, // Use user ID, not the full object
        date: { $gte: new Date() },
      })
      .sort("date")
      .populate("creator", "email username profilePicture")
      .populate("participants", "email username profilePicture");

    res.status(200).json({ msg: "Unjoined Events", events });
  } catch (err) {
    console.error("Error fetching unjoined events:", err.message);
    res.status(400).json({ msg: "Server Error", error: err.message });
  }
};

module.exports = {
  getDashainEvents,
  createEvent,
  getEvent,
  joinEvent,
  eventDetails,
  unjoinedEvents,
};
