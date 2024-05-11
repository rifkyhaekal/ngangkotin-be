class GetAngkotOrderTotalCountUseCase {
  constructor({ angkotOrderRepository }) {
    this._angkotOrderRepository = angkotOrderRepository;
  }

  async execute() {
    const totalCount = await this._angkotOrderRepository.getTotalCounts();

    return totalCount;
  }
}

module.exports = GetAngkotOrderTotalCountUseCase;
