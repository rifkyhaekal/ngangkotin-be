const ListResponse = require('../../../Common/responses/ListResponse');

class GetVehiclesListUseCase {
  constructor({ vehicleRepository }) {
    this._vehicleRepository = vehicleRepository;
  }

  async execute() {
    const vehiclesList = await this._vehicleRepository.getVehiclesList();

    return new ListResponse(vehiclesList);
  }
}

module.exports = GetVehiclesListUseCase;
