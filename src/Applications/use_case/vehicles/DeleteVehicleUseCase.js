const NotFoundError = require('../../../Common/exceptions/NotFoundError');

class DeleteVehicleUseCase {
  constructor({ vehicleRepository }) {
    this._vehicleRepository = vehicleRepository;
  }

  async execute(vehicleId) {
    const isVehicleExist = await this._vehicleRepository.verifyVehicleIsExist(
      vehicleId
    );

    if (!isVehicleExist) {
      throw new NotFoundError('Angkot tidak ditemukan.');
    }

    await this._vehicleRepository.deleteVehicle(vehicleId);
  }
}

module.exports = DeleteVehicleUseCase;
