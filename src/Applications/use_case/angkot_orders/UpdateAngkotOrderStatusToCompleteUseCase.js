const UpdateAngkotOrderStatus = require('../../../Domains/angkot_orders/entities/UpdateAngkotOrderStatus');
const AngkotOrderState = require('../../../Common/enums/angkotOrderStatus');
const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const InvalidOperationError = require('../../../Common/exceptions/InvalidOperationError');

class UpdateAngkotOrderStatusToCompleteUseCase {
  constructor({
    angkotOrderRepository,
    angkotOrderValidator,
    vehicleRepository,
  }) {
    this._angkotOrderRepository = angkotOrderRepository;
    this._vehicleRepository = vehicleRepository;
    this._angkotOrderValidator = angkotOrderValidator;
  }

  async execute(payload) {
    await this._angkotOrderValidator.validateUpdateAngkotOrderStatusToCompletePayload(
      payload
    );

    const angkotOrder = await this._angkotOrderRepository.getAngkotOrder(
      payload.id
    );

    if (!angkotOrder) {
      throw new NotFoundError(
        `Order dengan id: [${payload.id}] tidak ditemukan.`
      );
    }

    if (angkotOrder.status !== AngkotOrderState.RIDE) {
      throw new InvalidOperationError(
        `Tidak dapat memperbarui status, karena status sebelumnya tidak valid.`
      );
    }

    const vehicle = await this._vehicleRepository.getVehicleByDriverId(
      angkotOrder.driverId
    );

    if (!vehicle) {
      throw new NotFoundError(
        `Angkot dengan id: [${payload.id}] tidak ditemukan.`
      );
    }

    const updateCurrentPassengersPayload = {
      id: vehicle.id,
      totalPassengers: vehicle.currentPassengers - 1,
    };

    await this._vehicleRepository.updateVehicleCurrentPassengers(
      updateCurrentPassengersPayload
    );

    const updateAngkotOrderStatus = new UpdateAngkotOrderStatus({
      ...payload,
      status: AngkotOrderState.COMPLETE,
    });

    return this._angkotOrderRepository.updateAngkotOrderStatusToComplete(
      updateAngkotOrderStatus
    );
  }
}

module.exports = UpdateAngkotOrderStatusToCompleteUseCase;
