class ListResponse {
  constructor(items) {
    this._verifyPayload(items);

    this.items = items || [];
  }

  _verifyPayload(items) {
    if (!items) {
      throw new Error('PAGINATED_ROUTE.NOT_CONTAIN_NEDDED_PROPERTY');
    }
  }
}

module.exports = ListResponse;
