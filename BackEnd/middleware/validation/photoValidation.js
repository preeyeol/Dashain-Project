const { body } = require("express-validator");

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

module.exports = {
  validateUploadPhoto,
};
