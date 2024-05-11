const NotFoundError = require('../../../Common/exceptions/NotFoundError');

class DeleteRouteUseCase {
  constructor({ routeRepository }) {
    this._routeRepository = routeRepository;
  }

  async execute(routeId) {
    const isRouteExist = await this._routeRepository.verifyRouteIsExist(
      routeId
    );

    if (!isRouteExist) {
      throw new NotFoundError('Rute tidak ditemukan.');
    }

    await this._routeRepository.deleteRoute(routeId);
  }
}

module.exports = DeleteRouteUseCase;
