class CreateAngkotOrder {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      passengerId,
      driverId,
      pickupCoordinate,
      pickupAddress,
      destinationCoordinate,
      destinationAddress,
      price,
      distance,
      status,
    } = payload;

    this.passengerId = passengerId;
    this.driverId = driverId;
    this.pickupCoordinate = pickupCoordinate;
    this.pickupAddress = pickupAddress;
    this.destinationCoordinate = destinationCoordinate;
    this.destinationAddress = destinationAddress;
    this.price = price;
    this.distance = distance;
    this.status = status;
  }

  _verifyPayload({
    passengerId,
    driverId,
    pickupCoordinate,
    pickupAddress,
    destinationCoordinate,
    destinationAddress,
    price,
    distance,
    status,
  }) {
    if (
      !passengerId ||
      !driverId ||
      !pickupCoordinate ||
      !pickupAddress ||
      !destinationCoordinate ||
      !destinationAddress ||
      !price ||
      !distance ||
      !status
    ) {
      throw new Error('ADD_ANGKOT_ORDER.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof passengerId !== 'string' ||
      typeof driverId !== 'string' ||
      !Array.isArray(pickupCoordinate) ||
      typeof pickupAddress !== 'string' ||
      !Array.isArray(destinationCoordinate) ||
      typeof destinationAddress !== 'string' ||
      typeof price !== 'number' ||
      typeof distance !== 'number' ||
      typeof status !== 'string'
    ) {
      throw new Error('ADD_ANGKOT_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = CreateAngkotOrder;
