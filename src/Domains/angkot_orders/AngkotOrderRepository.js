/* eslint-disable no-unused-vars */
class AngkotOrderRepository {
  async createAngkotOrder(addAngkotOrder) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateAngkotOrderStatusToOnRide(updateAngkotOrderStatus) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateAngkotOrderStatusToComplete(updateAngkotOrderStatus) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAngkotOrders(pageSize, skip, sort, sortBy, search) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAngkotOrdersByPassengerId(skip, pageSize, passengerId) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAngkotOrdersByDriverId(skip, pageSize, driverId) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAngkotOrder(id) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyAngkotOrderIsExist(id) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTotalCounts() {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTotalCountsByPassengerId(passengerId) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTotalCountsByDriverId(driverId) {
    throw new Error('ANGKOT_ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AngkotOrderRepository;
