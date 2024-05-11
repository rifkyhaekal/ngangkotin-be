class AddVehicleType {
  constructor(payload) {
    this._verifyPayload(payload);

    const { code, colorName, colorHex, routeId } = payload;

    this.code = code;
    this.colorName = colorName;
    this.colorHex = colorHex;
    this.routeId = routeId;
  }

  _verifyPayload({ code, colorName, colorHex, routeId }) {
    if (!code || !colorName || !colorHex || !routeId) {
      throw new Error('ADD_VEHICLE_TYPE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof code !== 'string' ||
      typeof colorName !== 'string' ||
      typeof colorHex !== 'string' ||
      typeof routeId !== 'string'
    ) {
      throw new Error('ADD_VEHICLE_TYPE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddVehicleType;
