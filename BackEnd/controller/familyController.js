// const userSchema = require("../model/userSchema");

// const familyTree = {
//   addFamily: async (req, res) => {
//     try {
//       const { familyMemberId } = req.body;
//       console.log(familyMemberId);
//       console.log(req.user);
//       const user = await userSchema.findById(req.user._id);

//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }

//       if (user.familyMembers.includes({ memberId: familyMemberId })) {
//         return res.status(402).json({ msg: "Family member already exist" });
//       }

//       user.familyMembers.push({ memberId: familyMemberId });
//       await user.save();

//       const familyMember = await userSchema.findById(familyMemberId);
//       if (familyMember && familyMember.familyMembers.includes(user._id)) {
//         familyMember.familyMembers.push(user._id);
//         await familyMember.save();
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ msg: "Server Error" });
//     }
//   },
// };

// module.exports = familyTree;

const userSchema = require("../model/userSchema");

const familyTree = {
  addFamily: async (req, res) => {
    try {
      const { familyMemberId, relationship } = req.body;
      const currentUserId = req.body._id;
      console.log(familyMemberId);
      console.log(req.user);

      const user = await userSchema.findById(currentUserId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const userAdd = await userSchema.findById(req.user._id);
      if (!userAdd) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Check if familyMemberId already exists in familyMembers
      const isAlreadyFamilyMember = user.familyMembers.some(
        (member) => member.memberId.toString() === familyMemberId
      );
      if (isAlreadyFamilyMember) {
        return res.status(402).json({ msg: "Family member already exists" });
      }

      // Add the family member ID
      user.familyMembers.push({ memberId: familyMemberId });
      await user.save();

      // Find the family member and add the user ID to their familyMembers if not already present
      const familyMember = await userSchema.findById(familyMemberId);
      if (familyMember) {
        const isUserInFamilyMemberList = familyMember.familyMembers.some(
          (member) => member.toString() === user._id.toString()
        );

        if (!isUserInFamilyMemberList) {
          familyMember.familyMembers.push(user._id);
          await familyMember.save();
        }
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ msg: "Server Error" });
    }
  },
};

module.exports = familyTree;
