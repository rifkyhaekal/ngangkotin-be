class DetailLocation {
  constructor(payload) {
    this._verifyPayload(payload);

    const { coordinate } = payload;

    this.coordinate = coordinate;
  }

  _verifyPayload(payload) {
    const { coordinate } = payload;

    if (!coordinate) {
      throw new Error('NEW_LOCATION.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!Array.isArray(coordinate)) {
      throw new Error('NEW_LOCATION.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailLocation;
