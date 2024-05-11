const ListResponse = require('../../../Common/responses/ListResponse');

class GetVehicleTypesListUseCase {
  constructor({ vehicleTypeRepository }) {
    this._vehicleTypeRepository = vehicleTypeRepository;
  }

  async execute() {
    const vehicleTypesList =
      await this._vehicleTypeRepository.getVehicleTypesList();

    return new ListResponse(vehicleTypesList);
  }
}

module.exports = GetVehicleTypesListUseCase;
