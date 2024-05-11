/* eslint-disable no-unused-vars */
class CacheService {
  async set(payload, expirationInSecond = 3600) {
    throw new Error('CACHE_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async setCoordinate(payload) {
    throw new Error('CACHE_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async get(key) {
    throw new Error('CACHE_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async getLocationById(id) {
    throw new Error('CACHE_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  async getNearestDriver(coordinate) {
    throw new Error('CACHE_SERVICE.METHOD_NOT_IMPLEMENTED');
  }

  delete(key) {
    throw new Error('CACHE_SERVICE.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = CacheService;
