const UserValidator = require('../../../Applications/validator/UserValidator');

class JoiUserValidator extends UserValidator {
  constructor(userValidator) {
    super();

    this._userValidator = userValidator;
  }

  async validateAddUserPayload(payload) {
    return this._userValidator.validateAddUserPayload(payload);
  }

  async validateUpdateUserPayload(payload) {
    return this._userValidator.validateUpdateUserPayload(payload);
  }
}

module.exports = JoiUserValidator;
