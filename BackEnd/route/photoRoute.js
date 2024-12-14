const express = require("express");
const photoRoute = express.Router();
const { verifyToken } = require("../middleware/auth");
const photos = require("../controller/photoController");
const upload = require("../middleware/uploadFile");
const {
  validate,
  validateUploadPhoto,
  validateDeletePhoto,
} = require("../middleware/validation");

photoRoute.post(
  "/",
  verifyToken,
  validateUploadPhoto(),
  validate,
  upload.single("photo"),
  photos.uploadPhoto
);
photoRoute.get("/shared", verifyToken, photos.getSharedPhotos);
photoRoute.get("/user", verifyToken, photos.getUserPhotos);
photoRoute.post("/:photoId/like", verifyToken, photos.photoLike);
photoRoute.delete(
  "/:photoId",
  verifyToken,
  validateDeletePhoto(),
  validate,
  photos.deletePhoto
);

module.exports = photoRoute;
