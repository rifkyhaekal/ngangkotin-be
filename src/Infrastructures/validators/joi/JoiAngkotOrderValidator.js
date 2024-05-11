const AngkotOrderValidator = require('../../../Applications/validator/AngkotOrderValidator');

class JoiAngkotOrderValidator extends AngkotOrderValidator {
  constructor(angkotOrderValidator) {
    super();

    this._angkotOrderValidator = angkotOrderValidator;
  }

  async validateCreateAngkotOrderPayload(payload) {
    return this._angkotOrderValidator.validateCreateAngkotOrderPayload(payload);
  }

  async validateUpdateAngkotOrderStatusToOnRidePayload(payload) {
    return this._angkotOrderValidator.validateUpdateAngkotOrderStatusOnRidePayload(
      payload
    );
  }

  async validateUpdateAngkotOrderStatusToCompletePayload(payload) {
    return this._angkotOrderValidator.validateUpdateAngkotOrderStatusCompletePayload(
      payload
    );
  }
}

module.exports = JoiAngkotOrderValidator;
