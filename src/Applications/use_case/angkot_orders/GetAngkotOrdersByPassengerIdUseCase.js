const { camelToSnake } = require('../../../Common/helpers/StringMapperHelper');
const PaginatedMobileListResponse = require('../../../Common/responses/PaginatedMobileListResponse');

class GetAngkotOrdersByPassengerIdUseCase {
  constructor({ angkotOrderRepository }) {
    this._angkotOrderRepository = angkotOrderRepository;
  }

  async execute(query, params) {
    let { page = 1 } = query;
    page = parseInt(page, 10);

    let { passengerId } = params;
    const pageSize = 20;

    if (page <= 0) {
      page = parseInt(1, 10);
    }

    let nextPageCount = page + 1;
    let prevPageCount = page - 1;

    const totalCount =
      await this._angkotOrderRepository.getTotalCountsByPassengerId(
        passengerId
      );

    const totalPages = Math.ceil(totalCount / pageSize);

    if (page >= totalPages) {
      page = totalPages - 1;
    }

    let angkotOrders = [];

    if (totalCount > 0) {
      angkotOrders =
        await this._angkotOrderRepository.getAngkotOrdersByPassengerId(
          page * pageSize,
          pageSize,
          passengerId
        );
    }

    let nextPage = `${process.env.SERVER}/${passengerId}/?page=${nextPageCount}`;
    let previousPage = `${process.env.SERVER}/${passengerId}/?page=${prevPageCount}`;

    if (nextPageCount > totalPages) {
      nextPage = null;
    }

    if (prevPageCount < 1) {
      previousPage = null;
    }

    const info = {
      count: totalCount,
      pages: totalPages,
      next: nextPage,
      prev: previousPage,
    };

    return new PaginatedMobileListResponse(info, angkotOrders);
  }
}

module.exports = GetAngkotOrdersByPassengerIdUseCase;
