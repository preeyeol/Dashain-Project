const userSchema = require("../model/userSchema");

const familyTree = {
  addFamily: async (req, res) => {
    try {
      const { familyMemberId } = req.body;
      if (!familyMemberId) {
        return res
          .status(400)
          .json({ success: false, msg: "Family member ID is required" });
      }

      const isFamilyMember = await userSchema.findById(familyMemberId);

      if (!isFamilyMember) {
        return res
          .status(400)
          .json({ success: false, msg: "family member doesn't exist" });
      }

      const user = await userSchema.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      console.log(user, familyMemberId);

      if (
        user.familyMembers.some(
          (member) => String(member.memberId) === familyMemberId.toString()
        )
      ) {
        return res
          .status(400)
          .json({ success: false, msg: "Family member already exists" });
      }

      user.familyMembers.push({ memberId: familyMemberId });

      await user.save();

      const familyMember = await userSchema.findById(familyMemberId);
      if (
        familyMember &&
        !familyMember.familyMembers.some(
          (member) => member.memberId === user._id.toString()
        )
      ) {
        familyMember.familyMembers.push({ memberId: user._id });
        await familyMember.save();
      }
      res.status(200).json({ msg: "Family member added successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server Error" });
    }
  },
};

module.exports = familyTree;

// const userSchema = require("../model/userSchema");

// const familyTree = {
//   addFamily: async (req, res) => {
//     try {
//       const { familyMemberId, relationship } = req.body;
//       const currentUserId = req.body._id;
//       console.log(familyMemberId);
//       console.log(req.user);

//       const user = await userSchema.findById(currentUserId);
//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }

//       const userAdd = await userSchema.findById(req.user._id);
//       if (!userAdd) {
//         return res.status(404).json({ msg: "User not found" });
//       }

//       // Check if familyMemberId already exists in familyMembers
//       const isAlreadyFamilyMember = user.familyMembers.some(
//         (member) => member.memberId.toString() === familyMemberId
//       );
//       if (isAlreadyFamilyMember) {
//         return res.status(402).json({ msg: "Family member already exists" });
//       }

//       // Add the family member ID
//       user.familyMembers.push({ memberId: familyMemberId });
//       await user.save();

//       // Find the family member and add the user ID to their familyMembers if not already present
//       const familyMember = await userSchema.findById(familyMemberId);
//       if (familyMember) {
//         const isUserInFamilyMemberList = familyMember.familyMembers.some(
//           (member) => member.toString() === user._id.toString()
//         );

//         if (!isUserInFamilyMemberList) {
//           familyMember.familyMembers.push(user._id);
//           await familyMember.save();
//         }
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       console.error(error); // Log error for debugging
//       res.status(500).json({ msg: "Server Error" });
//     }
//   },
// };

// module.exports = familyTree;
