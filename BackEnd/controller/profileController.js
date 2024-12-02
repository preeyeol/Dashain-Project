const userSchema = require("../model/userSchema");
const eventSchema = require("../model/eventSchema");
const photoSchema = require("../model/photoSchema");

const profileController = {
  updateProfile: async (req, res) => {
    const userId = req.user._id;
    const user = await userSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const filePath = path.join(__dirname, "..", "uoload", photo.imageUrl);

    if (user.profilePicture == "") {
      user.profilePicture.push(filePath);
      return res.status(400).json({ msg: "Profile Updated" });
    }

    console.log(user);
  },
};

module.exports = profileController;
