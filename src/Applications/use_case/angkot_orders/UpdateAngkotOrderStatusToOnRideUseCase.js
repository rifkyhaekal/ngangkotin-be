const UpdateAngkotOrderStatus = require('../../../Domains/angkot_orders/entities/UpdateAngkotOrderStatus');
const AngkotOrderState = require('../../../Common/enums/angkotOrderStatus');
const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const InvalidOperationError = require('../../../Common/exceptions/InvalidOperationError');

class UpdateAngkotOrderStatusToOnRideUseCase {
  constructor({ angkotOrderRepository, angkotOrderValidator }) {
    this._angkotOrderRepository = angkotOrderRepository;
    this._angkotOrderValidator = angkotOrderValidator;
  }

  async execute(payload) {
    await this._angkotOrderValidator.validateUpdateAngkotOrderStatusToOnRidePayload(
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

    if (angkotOrder.status !== AngkotOrderState.PICKUP) {
      throw new InvalidOperationError(
        `Tidak dapat memperbarui status, karena status sebelumnya tidak valid.`
      );
    }

    const updateAngkotOrderStatus = new UpdateAngkotOrderStatus({
      ...payload,
      status: AngkotOrderState.RIDE,
    });

    return this._angkotOrderRepository.updateAngkotOrderStatusToOnRide(
      updateAngkotOrderStatus
    );
  }
}

module.exports = UpdateAngkotOrderStatusToOnRideUseCase;
