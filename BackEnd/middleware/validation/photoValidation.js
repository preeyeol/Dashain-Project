const { body, param } = require("express-validator");

const validateUploadPhoto = () => {
  return [
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description should not be empty")
      .isLength({ max: 500 })
      .withMessage("Description cannot exceed 500 characters"),
  ];
};

const validateDeletePhoto = () => {
  return [
    param("photoId")
      .notEmpty()
      .withMessage("Provide object Id of Photo")
      .isMongoId()
      .withMessage("Provide valid photo Id"),
  ];
};
module.exports = {
  validateUploadPhoto,
  validateDeletePhoto,
};
