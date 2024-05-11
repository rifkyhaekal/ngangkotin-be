const UpdateVehicleType = require('../../../Domains/vehicle_types/entities/UpdateVehicleType');

class UpdateVehicleTypeUseCase {
  constructor({ vehicleTypeRepository, vehicleTypeValidator }) {
    this._vehicleTypeRepository = vehicleTypeRepository;
    this._vehicleTypeValidator = vehicleTypeValidator;
  }

  async execute(payload) {
    await this._vehicleTypeValidator.validateUpdateVehicleTypePayload(payload);

    const updateVehicleType = new UpdateVehicleType(payload);
    return this._vehicleTypeRepository.updateVehicleType(updateVehicleType);
  }
}

module.exports = UpdateVehicleTypeUseCase;
