const UpdateVehicle = require('../../../Domains/vehicles/entities/UpdateVehicle');

class UpdateVehicleUseCase {
  constructor({ vehicleRepository, vehicleValidator }) {
    this._vehicleRepository = vehicleRepository;
    this._vehicleValidator = vehicleValidator;
  }

  async execute(payload) {
    await this._vehicleValidator.validateUpdateVehiclePayload(payload);

    const updateVehicle = new UpdateVehicle(payload);
    return this._vehicleRepository.updateVehicle(updateVehicle);
  }
}

module.exports = UpdateVehicleUseCase;
