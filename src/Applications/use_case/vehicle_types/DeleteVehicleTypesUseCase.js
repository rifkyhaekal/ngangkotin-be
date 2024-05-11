class DeleteVehicleTypesUseCase {
  constructor({ vehicleTypeRepository }) {
    this._vehicleTypeRepository = vehicleTypeRepository;
  }

  async execute(vehicleTypeIds) {
    const result = await this._vehicleTypeRepository.deleteVehicleTypes(
      vehicleTypeIds
    );

    return result;
  }
}

module.exports = DeleteVehicleTypesUseCase;
