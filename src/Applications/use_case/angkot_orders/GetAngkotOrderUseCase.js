const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const DetailAngkotOrder = require('../../../Domains/angkot_orders/entities/DetailAngkotOrder');

class GetAngkotOrderUseCase {
  constructor({ angkotOrderRepository }) {
    this._angkotOrderRepository = angkotOrderRepository;
  }

  async execute(angkotOrderId) {
    const angkotOrder = await this._angkotOrderRepository.getAngkotOrder(
      angkotOrderId
    );

    if (!angkotOrder) {
      throw new NotFoundError(
        `Angkot order dengan id: [${angkotOrderId}] tidak ditemukan.`
      );
    }

    const modifiedPayload = {
      ...angkotOrder,
      price: Number(angkotOrder.price),
    };

    return new DetailAngkotOrder(modifiedPayload);
  }
}

module.exports = GetAngkotOrderUseCase;
