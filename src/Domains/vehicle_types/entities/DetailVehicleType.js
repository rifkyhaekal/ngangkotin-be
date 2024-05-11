class DetailVehicleType {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      code,
      colorName,
      colorHex,
      routeId,
      createdAt,
      createdBy,
      isDeleted,
      modifiedBy,
      modifiedAt,
      routeName,
    } = payload;

    this.id = id;
    this.code = code;
    this.colorName = colorName;
    this.colorHex = colorHex;
    this.routeId = routeId;
    this.routeName = routeName;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.isDeleted = isDeleted;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
  }

  _verifyPayload({
    id,
    code,
    colorName,
    colorHex,
    routeId,
    createdAt,
    createdBy,
    routeName,
  }) {
    if (
      !id ||
      !code ||
      !colorName ||
      !colorHex ||
      !routeId ||
      !createdAt ||
      !createdBy ||
      !routeName
    ) {
      throw new Error('DETAIL_VEHICLE_TYPE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof code !== 'string' ||
      typeof colorHex !== 'string' ||
      typeof routeId !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof createdBy !== 'string' ||
      typeof routeName !== 'string'
    ) {
      throw new Error('DETAIL_VEHICLE_TYPE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailVehicleType;
