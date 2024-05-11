const { camelToSnake } = require('../../../Common/helpers/StringMapperHelper');
const PaginatedListResponse = require('../../../Common/responses/PaginatedListResponse');

class GetUsersByRoleNameUseCase {
  constructor({ userRepository, paginationValidator }) {
    this._userRepository = userRepository;
    this._paginationValidator = paginationValidator;
  }

  async execute(query) {
    await this._paginationValidator.validatePaginationRequestQuery(query);

    let { page = 0, pageSize = 10, sort = '', sortBy = '' } = query;
    const { roleName, search = '' } = query;

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

    const totalCount = await this._userRepository.getUsersTotalCountByRoleName(
      roleName
    );

    const totalPages = Math.ceil(totalCount / pageSize);

    if (page >= totalPages) {
      page = totalPages - 1;
    }

    let users = [];

    if (totalCount > 0) {
      users = await this._userRepository.getUsersByRoleName(
        pageSize,
        page * pageSize,
        sort,
        camelToSnake(sortBy),
        search,
        roleName
      );
    }

    return new PaginatedListResponse(users, totalCount);
  }
}

module.exports = GetUsersByRoleNameUseCase;
