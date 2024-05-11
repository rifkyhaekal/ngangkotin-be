class AddLocation {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, coordinate } = payload;

    this.id = id;
    this.coordinate = coordinate;
  }

  _verifyPayload(payload) {
    const { id, coordinate } = payload;

    if (!id || !coordinate) {
      throw new Error('NEW_LOCATION.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || !Array.isArray(coordinate)) {
      throw new Error('NEW_LOCATION.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddLocation;
