const validate = require("./validation");
const {
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
} = require("./userValidation");

const { validateEventCreation } = require("./eventValidation");

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
  validateEventCreation,
};
