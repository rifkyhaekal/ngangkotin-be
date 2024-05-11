class GetVehicleTotalCountUseCase {
  constructor({ vehicleRepository }) {
    this._vehicleRepository = vehicleRepository;
  }

  async execute() {
    const totalCount = await this._vehicleRepository.getTotalCounts();

    return totalCount;
  }
}

module.exports = GetVehicleTotalCountUseCase;
