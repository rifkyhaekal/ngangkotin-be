class PaginatedListResponse {
  constructor(items, totalCount) {
    this._verifyPayload(items, totalCount);

    this.items = items || [];
    this.totalCount = totalCount || 0;
  }

  _verifyPayload(items, totalCount) {
    if (!items) {
      throw new Error('PAGINATED.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (totalCount < 0) {
      throw new Error('PAGINATED.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (!Array.isArray(items) || typeof totalCount !== 'number') {
      throw new Error('PAGINATED.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PaginatedListResponse;
