const VehicleTypeValidator = require('../../../Applications/validator/VehicleTypeValidator');

class JoiVehicleTypeValidator extends VehicleTypeValidator {
  constructor(vehicleTypeValidator) {
    super();

    this._vehicleTypeValidator = vehicleTypeValidator;
  }

  async validateAddVehicleTypePayload(payload) {
    return this._vehicleTypeValidator.validateAddVehicleTypePayload(payload);
  }

  async validateUpdateVehicleTypePayload(payload) {
    return this._vehicleTypeValidator.validateUpdateVehicleTypePayload(payload);
  }
}

module.exports = JoiVehicleTypeValidator;
