const photoSchema = require("../model/photoSchema");
const userSchema = require("../model/userSchema");
const path = require("path");
const fs = require("fs");

const photos = {
  uploadPhoto: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: "No file provided" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      const photo = new photoSchema({
        userId: req.user._id,
        imageUrl: fileUrl,
        description: req.body.description || "",
      });

      await photo.save();
      res.status(200).json(photo);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server error", err });
    }
  },

  getSharedPhotos: async (req, res) => {
    try {
      const userId = req.user._id;
      const currentUser = await userSchema.findById(userId);

      if (!currentUser) {
        return res.status(400).json({ msg: "User not found" });
      }

      const photos = await photoSchema
        .find({
          userId: { $in: [...currentUser.familyMembers, userId] },
        })
        .populate("userId", "username email profilePicture")
        .populate("likes", "usernamename profilePicture")
        .sort("-createdAt");

      res.json(photos);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
    }
  },
  getUserPhotos: async (req, res) => {
    try {
      const userId = req.user._id;
      const photos = await photoSchema
        .find({ userId })
        .populate("userId", "username email profilePicture")
        .sort("-createdAt");

      res.json(photos);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
    }
  },

  photoLike: async (req, res) => {
    try {
      const userId = req.user._id;
      const photoId = req.params.photoId;

      const photo = await photoSchema.findById(photoId);

      if (!photo) {
        return res.status(400).json({ msg: "Photo NOT FOUND!!" });
      }

      if (photo.likes.includes(userId)) {
        photo.likes.remove(userId);
      }
      await photo.save();
      const likeIndex = photo.likes.indexOf(photoId);

      if (likeIndex == -1) {
        photo.likes.push(req.user._id);
      }
      await photo.save();

      res.json({ photo: photo.likes });
      console.log(photo);

      console.log(photoId);
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
    }
  },

  deletePhoto: async (req, res) => {
    try {
      const userId = req.user._id;
      const photoId = req.params.photoId;

      const photo = await photoSchema.findById(photoId);

      if (!photo || photo.userId.toString() != userId.toString()) {
        return res.status(404).json({
          message: "Photo not found or you don't have permission to delete it",
        });
      }

      const filePath = path.join(__dirname, "..", "uoload", photo.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error("error deleting file", err);
        });
      }
      await photo.deleteOne();

      res.json({ msg: "Photo Deleted Successfully", photo });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: "Server Error", err });
    }
  },
};

module.exports = photos;
