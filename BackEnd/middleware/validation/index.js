const validate = require("./validation");
const {
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
} = require("./userValidation");

const {
  validateEventCreation,
  validateEventJoin,
} = require("./eventValidation");

const { validateUploadPhoto } = require("./photoValidation");

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
  validateEventCreation,
  validateEventJoin,
  validateUploadPhoto,
};
