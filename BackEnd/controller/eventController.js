const eventSchema = require("../model/eventSchema");

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
    const event = new eventSchema({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      userId: req.body.userId,
    });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
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
  const userId = req.user._id;

  const isEventExist = await eventSchema.findById(eventId);
  console.log(isEventExist);

  if (!isEventExist) {
    return res.status(404).json({ msg: "Event not found" });
  }
  if ((isEventExist.participants = [userId])) {
    return res.status(400).json({ msg: "User is already a participant" });
  }

  const creatorInfo = await User.findOne({
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

module.exports = { getDashainEvents, createEvent, getEvent, joinEvent };
