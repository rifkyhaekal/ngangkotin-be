const { camelToSnake } = require('../../../Common/helpers/StringMapperHelper');
const PaginatedListResponse = require('../../../Common/responses/PaginatedListResponse');

class GetVehicleTypesUseCase {
  constructor({ vehicleTypeRepository, paginationValidator }) {
    this._vehicleTypeRepository = vehicleTypeRepository;
    this._paginationValidator = paginationValidator;
  }

  async execute(query) {
    await this._paginationValidator.validatePaginationRequestQuery(query);

    let { page = 0, pageSize = 10, sort = '', sortBy = '' } = query;
    const { search = '' } = query;

    if (page < 0) {
      page = 0;
    }

    if (pageSize < 10) {
      pageSize = 10;
    }

    if (sort === '') {
      sort = 'DESC';
    }

    if (sortBy === '') {
      sortBy = 'created_at';
    }

    const totalCount = await this._vehicleTypeRepository.getTotalCounts();

    const totalPages = Math.ceil(totalCount / pageSize);

    if (page >= totalPages) {
      page = totalPages - 1;
    }

    let vehicleTypes = [];

    if (totalCount > 0) {
      vehicleTypes = await this._vehicleTypeRepository.getVehicleTypes(
        pageSize,
        page * pageSize,
        sort,
        camelToSnake(sortBy),
        search
      );
    }

    return new PaginatedListResponse(vehicleTypes, totalCount);
  }
}

module.exports = GetVehicleTypesUseCase;
