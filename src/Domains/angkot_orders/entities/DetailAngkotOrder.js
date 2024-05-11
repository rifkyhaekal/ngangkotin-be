class DetailAngkotOrder {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      passengerId,
      driverId,
      passengerName,
      driverName,
      pickupCoordinate,
      pickupAddress,
      destinationCoordinate,
      destinationAddress,
      price,
      distance,
      currentPassengers,
      registrationNumber,
      totalPassengers,
      condition,
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
    this.passengerId = passengerId;
    this.driverId = driverId;
    this.passengerName = passengerName;
    this.driverName = driverName;
    this.pickupCoordinate = pickupCoordinate;
    this.pickupAddress = pickupAddress;
    this.destinationCoordinate = destinationCoordinate;
    this.destinationAddress = destinationAddress;
    this.price = price;
    this.distance = distance;
    this.registrationNumber = registrationNumber;
    this.totalPassengers = totalPassengers;
    this.condition = condition;
    this.currentPassengers = currentPassengers;
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
    passengerId,
    driverId,
    passengerName,
    driverName,
    pickupCoordinate,
    pickupAddress,
    destinationCoordinate,
    destinationAddress,
    price,
    distance,
    currentPassengers,
    registrationNumber,
    totalPassengers,
    condition,
    code,
    colorName,
    colorHex,
    routeName,
    createdAt,
    createdBy,
  }) {
    if (
      !id ||
      !passengerId ||
      !driverId ||
      !passengerName ||
      !driverName ||
      !pickupCoordinate ||
      !pickupAddress ||
      !destinationCoordinate ||
      !destinationAddress ||
      !price ||
      !distance ||
      !currentPassengers ||
      !registrationNumber ||
      !totalPassengers ||
      !condition ||
      !code ||
      !colorName ||
      !colorHex ||
      !routeName ||
      !createdAt ||
      !createdBy
    ) {
      throw new Error('DETAIL_ANGKOT_ORDER.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof passengerId !== 'string' ||
      typeof driverId !== 'string' ||
      typeof passengerName !== 'string' ||
      typeof driverName !== 'string' ||
      !Array.isArray(pickupCoordinate) ||
      typeof pickupAddress !== 'string' ||
      !Array.isArray(destinationCoordinate) ||
      typeof destinationAddress !== 'string' ||
      typeof price !== 'number' ||
      typeof distance !== 'number' ||
      typeof currentPassengers !== 'number' ||
      typeof registrationNumber !== 'string' ||
      typeof totalPassengers !== 'number' ||
      typeof condition !== 'string' ||
      typeof code !== 'string' ||
      typeof colorName !== 'string' ||
      typeof colorHex !== 'string' ||
      typeof driverName !== 'string' ||
      typeof routeName !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof createdBy !== 'string'
    ) {
      throw new Error('DETAIL_VEHICLE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailAngkotOrder;
