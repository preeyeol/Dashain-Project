const validate = require("./validation");
const {
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
} = require("./userValidation");

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
};
