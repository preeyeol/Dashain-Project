const express = require("express");
const photoRoute = express.Router();
const { verifyToken } = require("../middleware/auth");
const photos = require("../controller/photoController");
const upload = require("../middleware/uploadFile");

photoRoute.post("/", verifyToken, upload.single("photo"), photos.uploadPhoto);
photoRoute.get("/shared", verifyToken, photos.getSharedPhotos);
photoRoute.get("/user", verifyToken, photos.getUserPhotos);
photoRoute.post("/:photoId/like", verifyToken, photos.photoLike);
photoRoute.delete("/:photoId", verifyToken, photos.deletePhoto);

module.exports = photoRoute;
