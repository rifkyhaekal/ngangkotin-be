const AddVehicle = require('../../../Domains/vehicles/entities/AddVehicle');
const AddedItemResponse = require('../../../Common/responses/AddedItemResponse');

class AddVehicleUseCase {
  constructor({ vehicleRepository, vehicleValidator }) {
    this._vehicleRepository = vehicleRepository;
    this._vehicleValidator = vehicleValidator;
  }

  async execute(payload) {
    await this._vehicleValidator.validateAddVehiclePayload(payload);

    const addVehicle = new AddVehicle(payload);
    const result = await this._vehicleRepository.addVehicle(addVehicle);

    return new AddedItemResponse(result);
  }
}

module.exports = AddVehicleUseCase;
