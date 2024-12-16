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

const {
  validateUploadPhoto,
  validateDeletePhoto,
} = require("./photoValidation");

const { validateSendTika } = require("./tikaValidation");

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateAddFamily,
  validateDeleteFamily,
  validateEventCreation,
  validateEventJoin,
  validateUploadPhoto,
  validateDeletePhoto,
  validateSendTika,
};
