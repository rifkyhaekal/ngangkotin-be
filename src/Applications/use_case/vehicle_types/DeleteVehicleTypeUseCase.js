const NotFoundError = require('../../../Common/exceptions/NotFoundError');

class DeleteVehicleTypeUseCase {
  constructor({ vehicleTypeRepository }) {
    this._vehicleTypeRepository = vehicleTypeRepository;
  }

  async execute(vehicleTypeId) {
    const isVehicleTypeExist =
      await this._vehicleTypeRepository.verifyVehicleTypeIsExist(vehicleTypeId);

    if (!isVehicleTypeExist) {
      throw new NotFoundError('Tipe angkot tidak ditemukan.');
    }

    await this._vehicleTypeRepository.deleteVehicleType(vehicleTypeId);
  }
}

module.exports = DeleteVehicleTypeUseCase;
