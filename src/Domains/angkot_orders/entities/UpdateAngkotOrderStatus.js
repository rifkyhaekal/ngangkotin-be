class UpdateAngkotOrderStatus {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, status } = payload;

    this.id = id;
    this.status = status;
  }

  _verifyPayload({ id, status }) {
    if (!id || !status) {
      throw new Error('UPDATE_ANGKOT_ORDER.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof status !== 'string') {
      throw new Error('UPDATE_ANGKO_TORDER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UpdateAngkotOrderStatus;
