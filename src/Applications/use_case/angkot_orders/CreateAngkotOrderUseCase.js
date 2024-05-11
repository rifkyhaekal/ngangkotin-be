const CreateAngkotOrder = require('../../../Domains/angkot_orders/entities/CreateAngkotOrder');
const AngkotOrderState = require('../../../Common/enums/angkotOrderStatus');
const { calculateDistance } = require('../../../Common/helpers/DistanceHelper');
const NotFoundError = require('../../../Common/exceptions/NotFoundError');

class CreateAngkotOrderUseCase {
  constructor({
    angkotOrderRepository,
    userRepository,
    vehicleRepository,
    angkotOrderValidator,
    cacheService,
  }) {
    this._angkotOrderRepository = angkotOrderRepository;
    this._userRepository = userRepository;
    this._vehicleRepository = vehicleRepository;
    this._angkotOrderValidator = angkotOrderValidator;
    this._cacheService = cacheService;
  }

  async execute(payload) {
    const passenger = await this._userRepository.getUserById(
      payload.passengerId
    );

    if (!passenger) {
      throw new NotFoundError(
        `Penumpang dengan id: [${payload.passengerId}] tidak ditemukan.`
      );
    }

    let driver;
    let vehicle;
    let isVehicleCapacityEnough = false;
    let notExceptedDrivers = [];

    do {
      // eslint-disable-next-line no-await-in-loop
      let drivers = await this._cacheService.getNearestDriver(
        payload.pickupCoordinate
      );

      console.log('driveresssssssssssssssssssss', drivers);

      let filteredDrivers = [];

      if (notExceptedDrivers.length > 0) {
        filteredDrivers = drivers.filter((id) => {
          !notExceptedDrivers.includes(id);
        });
      } else {
        filteredDrivers = drivers;
      }

      console.log('filtereddriverrrrrrrrrrrrrrrrrrrrrrrrs', filteredDrivers);

      for (const id of filteredDrivers) {
        let driverLocation = await this._cacheService.getLocationById(id);
        console.log('idddddddddddddddddddddddd', id);
        console.log(driverLocation);
        console.log(payload.pickupCoordinate);

        if (Number(driverLocation[0]) < payload.pickupCoordinate[1]) {
          driver = id;
          console.log('masuk sinii', id);
          console.log('masuk siniii', driver);
          break;
        }
      }

      console.log('driveresssssssssssssssssssssId', driver);

      if (driver) {
        // eslint-disable-next-line no-await-in-loop
        vehicle = await this._vehicleRepository.getVehicleByDriverId(driver);

        if (vehicle.currentPassengers === null) {
          vehicle.currentPassengers = 0;
        }

        if (vehicle.totalPassengers >= vehicle.currentPassengers) {
          isVehicleCapacityEnough = true;
        } else {
          notExceptedDrivers.push(driver);
        }
      }

      console.log(
        'notExceptedDriversssssssssssssssssssssssss',
        notExceptedDrivers
      );
    } while (!isVehicleCapacityEnough);

    if (isVehicleCapacityEnough) {
      const updateCurrentPassengersPayload = {
        id: vehicle.id,
        totalPassengers: vehicle.currentPassengers + 1,
      };

      await this._vehicleRepository.updateVehicleCurrentPassengers(
        updateCurrentPassengersPayload
      );
    }

    const distanceBetweenPickupAndDestinationCoordinate = calculateDistance(
      payload.pickupCoordinate,
      payload.destinationCoordinate
    );

    const modifiedPayload = {
      ...payload,
      price: 4000,
      distance: distanceBetweenPickupAndDestinationCoordinate,
      driverId: driver,
      status: AngkotOrderState.PICKUP,
    };

    await this._angkotOrderValidator.validateCreateAngkotOrderPayload(
      modifiedPayload
    );

    const createAngkotOrder = new CreateAngkotOrder(modifiedPayload);
    const result = await this._angkotOrderRepository.createAngkotOrder(
      createAngkotOrder
    );

    return {
      id: result,
      price: modifiedPayload.price,
      distance: modifiedPayload.distance,
      passengerId: modifiedPayload.passengerId,
      passengerName: passenger.name,
      destinationName: modifiedPayload.destinationAddress,
      destinationCoordinate: modifiedPayload.destinationCoordinate,
      pickupLocationName: modifiedPayload.pickupAddress,
      pickupLocationCoordinate: modifiedPayload.pickupCoordinate,
      driverId: modifiedPayload.driverId,
    };
  }
}

module.exports = CreateAngkotOrderUseCase;
