const validate = require("./validation");
const { validateRegistration, validateLogin } = require("./userValidation");

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
};
