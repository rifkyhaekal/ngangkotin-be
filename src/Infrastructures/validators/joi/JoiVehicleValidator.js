const VehicleValidator = require('../../../Applications/validator/VehicleValidator');

class JoiVehicleValidator extends VehicleValidator {
  constructor(vehicleValidator) {
    super();

    this._vehicleValidator = vehicleValidator;
  }

  async validateAddVehiclePayload(payload) {
    return this._vehicleValidator.validateAddVehiclePayload(payload);
  }

  async validateUpdateVehiclePayload(payload) {
    return this._vehicleValidator.validateUpdateVehiclePayload(payload);
  }
}

module.exports = JoiVehicleValidator;
