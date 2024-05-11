const AddVehicleType = require('../../../Domains/vehicle_types/entities/AddVehicleType');
const AddedItemResponse = require('../../../Common/responses/AddedItemResponse');

class AddVehicleTypeUseCase {
  constructor({ vehicleTypeRepository, vehicleTypeValidator }) {
    this._vehicleTypeRepository = vehicleTypeRepository;
    this._vehicleTypeValidator = vehicleTypeValidator;
  }

  async execute(payload) {
    await this._vehicleTypeValidator.validateAddVehicleTypePayload(payload);

    const addVehicleType = new AddVehicleType(payload);
    const result = await this._vehicleTypeRepository.addVehicleType(
      addVehicleType
    );

    return new AddedItemResponse(result);
  }
}

module.exports = AddVehicleTypeUseCase;
