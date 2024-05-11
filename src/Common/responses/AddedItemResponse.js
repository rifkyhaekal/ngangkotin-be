class AddedItemResponse {
  constructor(id) {
    this._verifyPayload(id);

    this.id = id;
  }

  _verifyPayload(id) {
    if (!id) {
      throw new Error('ADDED_ITEM_RESPONSE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (typeof id !== 'string') {
      throw new Error('ADDED_ITEM_RESPONSE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddedItemResponse;
