const { body } = require("express-validator");

const validateRegistration = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Provide your username")
      .isLength({
        min: 3,
        max: 20,
      })
      .withMessage("username must be between 3 and 20 characters"),
    body("email")
      .notEmpty()
      .withMessage("Provide your email")
      .isEmail()
      .withMessage("Provide a vaild email address")
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("Provide your password")
      .isLength({
        min: 8,
        max: 16,
      })
      .withMessage("Password must be in between 8 and 16 characters"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Provide confirm password")
      .custom((value, { req }) => {
        return value.trim() === req.body.password.trim();
      })
      .withMessage("Passwords do not match "),
  ];
};

const validateLogin = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Provide your email")
      .isEmail()
      .withMessage("Provide vaild email address")
      .trim(),
    body("password")
      .notEmpty()
      .withMessage("Provide your password")
      .isLength({
        min: 8,
        max: 16,
      })
      .withMessage("Password must be in between 8 and 16 characters"),
  ];
};

module.exports = {
  validateRegistration,
  validateLogin,
};
