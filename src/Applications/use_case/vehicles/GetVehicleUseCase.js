const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const DetailVehicle = require('../../../Domains/vehicles/entities/DetailVehicle');

class GetVehicleUseCase {
  constructor({ vehicleRepository }) {
    this._vehicleRepository = vehicleRepository;
  }

  async execute(vehicleId) {
    const vehicle = await this._vehicleRepository.getVehicle(vehicleId);

    if (!vehicle) {
      throw new NotFoundError(
        `Angkot dengan id: [${vehicleId}] tidak ditemukan.`
      );
    }

    return new DetailVehicle(vehicle);
  }
}

module.exports = GetVehicleUseCase;
