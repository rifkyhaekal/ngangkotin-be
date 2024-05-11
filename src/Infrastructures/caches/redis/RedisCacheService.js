const CacheService = require('../../../Applications/cache/CacheService');

class RedisCacheService extends CacheService {
  constructor(redis) {
    super();

    this._client = redis;
  }

  async set(payload, expirationInSecond = 3600) {
    const { id, coordinate } = payload;
    await this._client.set(id, coordinate, {
      EX: expirationInSecond,
    });
  }

  async setCoordinate(payload) {
    const { id, coordinate } = payload;

    await this._client.geoadd(
      'driverlocations',
      coordinate[1],
      coordinate[0],
      id
    );
  }

  async get(key) {
    const result = await this._client.get(key);

    if (result === null) throw new Error('Cache not found');

    return result;
  }

  async getLocationById(id) {
    const location = await this._client.geopos('driverlocations', id);
    return location[0];
  }

  async getNearestDriver(coordinate) {
    const driver = await this._client.georadius(
      'driverlocations',
      coordinate[1],
      coordinate[0],
      2,
      'km'
    );

    return driver;
  }

  delete(key) {
    return this._client.del(key);
  }
}

module.exports = RedisCacheService;
