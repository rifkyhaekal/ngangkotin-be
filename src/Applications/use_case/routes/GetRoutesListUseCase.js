const ListResponse = require('../../../Common/responses/ListResponse');

class GetRoutesListUseCase {
  constructor({ routeRepository }) {
    this._routeRepository = routeRepository;
  }

  async execute() {
    const routesList = await this._routeRepository.getRoutesList();

    return new ListResponse(routesList);
  }
}

module.exports = GetRoutesListUseCase;
