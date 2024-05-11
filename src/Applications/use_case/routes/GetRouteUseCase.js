const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const DetailRoute = require('../../../Domains/routes/entities/DetailRoute');

class GetRouteUseCase {
  constructor({ routeRepository }) {
    this._routeRepository = routeRepository;
  }

  async execute(routeId) {
    const route = await this._routeRepository.getRoute(routeId);

    if (!route) {
      throw new NotFoundError(`Rute dengan id: [${routeId}] tidak ditemukan.`);
    }

    return new DetailRoute(route);
  }
}

module.exports = GetRouteUseCase;
