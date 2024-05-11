class AddVehicle {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      registrationNumber,
      totalPassengers,
      condition,
      brand,
      vehicleTypeId,
      driverId,
    } = payload;

    this.registrationNumber = registrationNumber;
    this.totalPassengers = totalPassengers;
    this.condition = condition;
    this.brand = brand;
    this.vehicleTypeId = vehicleTypeId;
    this.driverId = driverId;
  }

  _verifyPayload({
    registrationNumber,
    totalPassengers,
    condition,
    brand,
    vehicleTypeId,
    driverId,
  }) {
    if (
      !registrationNumber ||
      !totalPassengers ||
      !condition ||
      !brand ||
      !vehicleTypeId ||
      !driverId
    ) {
      throw new Error('ADD_VEHICLE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof registrationNumber !== 'string' ||
      typeof totalPassengers !== 'number' ||
      typeof condition !== 'string' ||
      typeof brand !== 'string' ||
      typeof vehicleTypeId !== 'string' ||
      typeof driverId !== 'string'
    ) {
      throw new Error('ADD_VEHICLE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddVehicle;
