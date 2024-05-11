class PaginatedMobileListResponse {
  constructor(info, results) {
    this._verifyPayload(info, results);

    this.info = info || {};
    this.results = results || [];
  }

  _verifyPayload(info, results) {
    if (!info) {
      throw new Error('PAGINATED.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (results < 0) {
      throw new Error('PAGINATED.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (typeof info !== 'object' || !Array.isArray(results)) {
      throw new Error('PAGINATED.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PaginatedMobileListResponse;
