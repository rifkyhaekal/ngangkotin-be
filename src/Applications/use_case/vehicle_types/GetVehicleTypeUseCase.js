const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const DetailVehicleType = require('../../../Domains/vehicle_types/entities/DetailVehicleType');

class GetVehicleTypeUseCase {
  constructor({ vehicleTypeRepository }) {
    this._vehicleTypeRepository = vehicleTypeRepository;
  }

  async execute(vehicleTypeId) {
    const vehicleType = await this._vehicleTypeRepository.getVehicleType(
      vehicleTypeId
    );

    if (!vehicleType) {
      throw new NotFoundError(
        `Tipe angkot dengan id: [${vehicleTypeId}] tidak ditemukan.`
      );
    }

    return new DetailVehicleType(vehicleType);
  }
}

module.exports = GetVehicleTypeUseCase;
