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
  getFamily: async (req, res) => {
    try {
      const user = await userSchema
        .findOne(req.user._id)
        .populate("familyMembers", "email username profilePicture");

      const userFam = await user.familyMembers;
      console.log(userFam);
      res.status(200).json({ msg: "User's Family Members", userFam });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
    }
  },
  deleteFam: async (req, res) => {
    try {
      const famId = req.params.id;
      const userId = req.user._id;

      const user = await userSchema.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const familyMemberIndex = user.familyMembers.findIndex(
        (member) => String(member.memberId) === famId
      );
      if (familyMemberIndex === -1) {
        return res
          .status(404)
          .json({ msg: "Family member not found in user's list" });
      }
      user.familyMembers.splice(familyMemberIndex, 1);
      await user.save();
      const familyMember = await userSchema.findById(famId);
      if (familyMember) {
        const userIndex = familyMember.familyMembers.findIndex(
          (member) => String(member.memberId) === String(userId)
        );
        if (userIndex !== -1) {
          familyMember.familyMembers.splice(userIndex, 1);
          await familyMember.save();
        }
      }

      res.status(200).json({ msg: "Family member removed successfully" });

      const del = await userSchema.deleteOne(famId);
      console.log(del);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
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
