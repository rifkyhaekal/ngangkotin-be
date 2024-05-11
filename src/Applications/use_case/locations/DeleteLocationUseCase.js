const NotFoundError = require('../../../Common/exceptions/NotFoundError');

class DeleteLocationUseCase {
  constructor({ cacheService }) {
    this._cacheService = cacheService;
  }

  async execute(id) {
    const location = await this._cacheService.get(id);

    if (location != null) {
      throw new NotFoundError('Lokasi tidak ditemukan.');
    }

    this._cacheService.delete(id);
  }
}

module.exports = DeleteLocationUseCase;
