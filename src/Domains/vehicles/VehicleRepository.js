/* eslint-disable no-unused-vars */
class VehicleRepository {
  async addVehicle(addVehicle) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateVehicle(updateVehicle) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateVehicleCurrentPassengers(payload) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteVehicle(vehicleId) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteVehicles(vehicleIds) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getVehicles(pageSize, skip, sort, sortBy, search) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getVehiclesList() {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getVehicle(vehicleId) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getVehicleByDriverId(driverId) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getVehicleByRegistrationNumber(registrationNumber, id = null) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyVehicleIsExist(vehicleId) {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTotalCounts() {
    throw new Error('VEHICLE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = VehicleRepository;
