class UpdateVehicle {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      registrationNumber,
      totalPassengers,
      condition,
      brand,
      vehicleTypeId,
      driverId,
    } = payload;

    this.id = id;
    this.registrationNumber = registrationNumber;
    this.totalPassengers = totalPassengers;
    this.condition = condition;
    this.brand = brand;
    this.vehicleTypeId = vehicleTypeId;
    this.driverId = driverId;
  }

  _verifyPayload({
    id,
    registrationNumber,
    totalPassengers,
    condition,
    brand,
    vehicleTypeId,
    driverId,
  }) {
    if (
      !id ||
      !registrationNumber ||
      !totalPassengers ||
      !condition ||
      !brand ||
      !vehicleTypeId ||
      !driverId
    ) {
      throw new Error('UPDATE_VEHICLE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof registrationNumber !== 'string' ||
      typeof totalPassengers !== 'number' ||
      typeof condition !== 'string' ||
      typeof brand !== 'string' ||
      typeof vehicleTypeId !== 'string' ||
      typeof driverId !== 'string'
    ) {
      throw new Error('UPDATE_VEHICLE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UpdateVehicle;
