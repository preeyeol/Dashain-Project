const userSchema = require("../model/userSchema");

const familyTree = {
  addFamily: async (req, res) => {
    try {
      const { famId } = req.body;
      const userId = req.user._id;
      console.log(famId);
      console.log(userId);
      const currentUser = await userSchema.findById(userId);

      console.log(currentUser);
      if (!famId) {
        return res.status(400).json({ msg: "FamId is required" });
      }

      if (famId == userId) {
        return res
          .status(400)
          .json({ msg: "You can't add yourself as family member" });
      }

      const familyToAdd = await userSchema.findById(famId);
      if (!familyToAdd) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }
      console.log(familyToAdd);

      if (currentUser.familyMembers.includes(familyToAdd._id)) {
        return res.status(400).json({ msg: "Family member already exist" });
      }

      await currentUser.familyMembers.push(familyToAdd._id);
      await familyToAdd.familyMembers.push(currentUser._id);
      await currentUser.save();
      await familyToAdd.save();

      const updatedUser = await userSchema
        .findById(userId)
        .populate("familyMembers", "username email");

      const updatedFam = await userSchema
        .findById(famId)
        .populate("familyMembers", "username email");
      res.status(200).json({
        msg: "Family added successfully",
        currentUser: updatedUser,
        familyToAdd: updatedFam,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
    }
  },
  getFamily: async (req, res) => {
    try {
      const userId = req.user._id;
      const currentUser = await userSchema
        .findById(userId)
        .populate("familyMembers", "email username");
      console.log(currentUser);
      const userFam = currentUser.familyMembers;
      res.status(200).json({ msg: "User's family members", userFam });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
    }
  },
  deleteFam: async (req, res) => {
    try {
      const { famId } = req.params;
      const userId = req.user._id;
      const currentUser = await userSchema.findById(req.user._id);
      console.log(currentUser);

      if (!currentUser.familyMembers.includes(famId)) {
        return res.status(400).json({ msg: "User is not a family member" });
      }

      const familyToDelete = await userSchema.findById(famId);
      if (!familyToDelete) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      if (!currentUser.familyMembers.includes(familyToDelete._id)) {
        return res.status(400).json({ msg: "User is not a family" });
      }
      currentUser.familyMembers = currentUser.familyMembers.filter(
        (fam) => fam._id.toString() !== famId
      );
      familyToDelete.familyMembers = familyToDelete.familyMembers.filter(
        (fam) => fam._id.toString() !== currentUser._id.toString()
      );

      await currentUser.save();
      await familyToDelete.save();

      const updatedUser = await userSchema
        .findById(userId)
        .populate("familyMembers", "username email");

      const updatedFam = await userSchema
        .findById(famId)
        .populate("familyMembers", "username email");
      res.status(200).json({
        msg: "Family member removed successfully",
        currentUser: updatedUser,
        familyToDelete: updatedFam,
      });
    } catch (err) {
      console.log(err);
      +res.status(400).json({ msg: "Server Error" });
    }
  },
};

module.exports = familyTree;
