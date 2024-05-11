const AddLocation = require('../../../Domains/locations/entities/AddLocation');

class SetLocationUseCase {
  constructor({ cacheService }) {
    this._cacheService = cacheService;
  }

  async execute(payload) {
    const addLocation = new AddLocation(payload);

    await this._cacheService.setCoordinate(addLocation);
  }
}

module.exports = SetLocationUseCase;
