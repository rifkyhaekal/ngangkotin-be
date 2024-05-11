const PaginatedListResponse = require('../../Domains/common/response/PaginatedListResponse');

const PaginatedListResponseHelper = {
  toPaginatedListResponse(source) {
    const { Items, TotalCount } = source;
    return new PaginatedListResponse(Items, TotalCount);
  },
};

module.exports = PaginatedListResponseHelper;
