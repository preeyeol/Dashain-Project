const { body } = require("express-validator");

const validateSendTika = () => {
  return [
    body("receiverId")
      .notEmpty()
      .withMessage("Receiver Id field must not be empty")
      .isMongoId()
      .withMessage("Provide Valid Receiver _id"),
    body("message").notEmpty().withMessage("Message must not be empty"),
  ];
};

module.exports = { validateSendTika };
