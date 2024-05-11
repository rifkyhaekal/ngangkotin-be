const { camelToSnake } = require('../../../Common/helpers/StringMapperHelper');
const PaginatedMobileListResponse = require('../../../Common/responses/PaginatedMobileListResponse');

class GetAngkotOrdersByDriverIdUseCase {
  constructor({ angkotOrderRepository }) {
    this._angkotOrderRepository = angkotOrderRepository;
  }

  async execute(query, params) {
    let { page = 1 } = query;
    page = parseInt(page, 10);

    let { driverId } = params;
    const pageSize = 20;

    if (page <= 0) {
      page = parseInt(1, 10);
    }

    console.log(page);

    let nextPageCount = page + 1;
    let prevPageCount = page - 1;

    console.log(nextPageCount);
    console.log(prevPageCount);

    const totalCount =
      await this._angkotOrderRepository.getTotalCountsByDriverId(driverId);

    const totalPages = Math.ceil(totalCount / pageSize);

    if (page >= totalPages) {
      page = totalPages - 1;
    }

    let angkotOrders = [];

    if (totalCount > 0) {
      angkotOrders =
        await this._angkotOrderRepository.getAngkotOrdersByDriverId(
          page * pageSize,
          pageSize,
          driverId
        );
    }

    let nextPage = `${process.env.SERVER}/${driverId}/?page=${nextPageCount}`;
    let previousPage = `${process.env.SERVER}/${driverId}/?page=${prevPageCount}`;

    console.log(nextPageCount > totalPages);
    console.log(prevPageCount < 1);

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

module.exports = GetAngkotOrdersByDriverIdUseCase;
