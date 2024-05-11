class UpdateVehicleType {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, code, colorName, colorHex, routeId } = payload;

    this.id = id;
    this.code = code;
    this.colorName = colorName;
    this.colorHex = colorHex;
    this.routeId = routeId;
  }

  _verifyPayload({ id, code, colorName, colorHex, routeId }) {
    if (!id || !code || !colorName || !colorHex || !routeId) {
      throw new Error('UPDATE_VEHICLE_TYPE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof code !== 'string' ||
      typeof colorName !== 'string' ||
      typeof colorHex !== 'string' ||
      typeof routeId !== 'string'
    ) {
      throw new Error('UPDATE_VEHICLE_TYPE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UpdateVehicleType;
