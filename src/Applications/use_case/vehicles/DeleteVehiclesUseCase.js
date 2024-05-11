class DeleteVehiclesUseCase {
  constructor({ vehicleRepository }) {
    this._vehicleRepository = vehicleRepository;
  }

  async execute(vehicleIds) {
    const result = await this._vehicleRepository.deleteVehicles(vehicleIds);

    return result;
  }
}

module.exports = DeleteVehiclesUseCase;
