const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const DetailLocation = require('../../../Domains/locations/entities/DetailLocation');

class GetLocationUseCase {
  constructor({ cacheService }) {
    this._cacheService = cacheService;
  }

  async execute(id) {
    const location = await this._cacheService.getLocationById(id);

    if (!location) {
      throw new NotFoundError(`Lokasi dengan id: [${id}] tidak ditemukan.`);
    }

    const payload = {
      coordinate: location,
    };

    return new DetailLocation(payload);
  }
}

module.exports = GetLocationUseCase;
