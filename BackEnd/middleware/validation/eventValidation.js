const { body, param } = require("express-validator");

const validateEventCreation = () => {
  return [
    body("title").notEmpty().withMessage("Provide title for event"),
    body("date").notEmpty().withMessage("Provide date for event"),
    body("description")
      .notEmpty()
      .withMessage("Provide description for event")
      .isLength({
        min: 8,
        max: 20,
      })
      .withMessage("Description must be between 8-20 letters"),
  ];
};

const validateEventJoin = () => {
  return [param("")];
};

module.exports = {
  validateEventCreation,
};
