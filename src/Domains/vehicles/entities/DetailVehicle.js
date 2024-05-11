class DetailVehicle {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      registrationNumber,
      totalPassengers,
      condition,
      brand,
      photoUrl,
      vehicleTypeId,
      driverId,
      driverName,
      code,
      colorName,
      colorHex,
      routeName,
      createdAt,
      createdBy,
      isDeleted,
      modifiedAt,
      modifiedBy,
    } = payload;

    this.id = id;
    this.registrationNumber = registrationNumber;
    this.totalPassengers = totalPassengers;
    this.condition = condition;
    this.brand = brand;
    this.photoUrl = photoUrl;
    this.vehicleTypeId = vehicleTypeId;
    this.driverId = driverId;
    this.driverName = driverName;
    this.code = code;
    this.colorName = colorName;
    this.colorHex = colorHex;
    this.routeName = routeName;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.isDeleted = isDeleted;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
  }

  _verifyPayload({
    id,
    registrationNumber,
    totalPassengers,
    condition,
    brand,
    vehicleTypeId,
    driverId,
    driverName,
    createdAt,
    createdBy,
  }) {
    if (
      !id ||
      !registrationNumber ||
      !totalPassengers ||
      !condition ||
      !brand ||
      !vehicleTypeId ||
      !driverId ||
      !driverName ||
      !vehicleTypeId ||
      !createdAt ||
      !createdBy
    ) {
      throw new Error('DETAIL_VEHICLE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof registrationNumber !== 'string' ||
      typeof totalPassengers !== 'number' ||
      typeof condition !== 'string' ||
      typeof brand !== 'string' ||
      typeof vehicleTypeId !== 'string' ||
      typeof driverId !== 'string' ||
      typeof driverName !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof createdBy !== 'string'
    ) {
      throw new Error('DETAIL_VEHICLE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailVehicle;
