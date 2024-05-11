const autoBind = require('auto-bind');
const NotFoundError = require('../../../../Common/exceptions/NotFoundError');
const GetRoutesUseCase = require('../../../../Applications/use_case/routes/GetRoutesUseCase');
const DeleteRouteUseCase = require('../../../../Applications/use_case/routes/DeleteRouteUseCase');
const DeleteRoutesUseCase = require('../../../../Applications/use_case/routes/DeleteRoutesUseCase');
const GetRoutesListUseCase = require('../../../../Applications/use_case/routes/GetRoutesListUseCase');
const GetRouteUseCase = require('../../../../Applications/use_case/routes/GetRouteUseCase');
const GetRoutesTotalCountUseCase = require('../../../../Applications/use_case/routes/GetRoutesTotalCountUseCase');

class RoutesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async deleteRouteHandler({ params, auth }, h) {
    const { id } = params;
    const modifiedBy = auth.credentials.email;

    const deleteRouteUseCase = this._container.getInstance(
      DeleteRouteUseCase.name
    );

    await deleteRouteUseCase.execute(id, modifiedBy);

    return h.response().code(204).takeover();
  }

  async deleteRoutesHandler({ payload }, h) {
    const deleteRoutesUseCase = this._container.getInstance(
      DeleteRoutesUseCase.name
    );

    const routesDeleted = await deleteRoutesUseCase.execute(payload.ids);

    const response = h.response({
      routesDeleted,
    });

    response.code(200);
    return response;
  }

  async getRoutesHandler({ query }) {
    const getRoutesUseCase = this._container.getInstance(GetRoutesUseCase.name);
    const paginatedListResponse = await getRoutesUseCase.execute(query);

    return {
      items: paginatedListResponse.items,
      totalCount: paginatedListResponse.totalCount,
    };
  }

  async getRoutesListHandler() {
    const getRoutesListUseCase = await this._container.getInstance(
      GetRoutesListUseCase.name
    );

    const routeList = await getRoutesListUseCase.execute();

    return {
      ...routeList,
    };
  }

  async getRouteByIdHandler({ params }) {
    const { id } = params;

    const getRouteUseCase = await this._container.getInstance(
      GetRouteUseCase.name
    );

    const route = await getRouteUseCase.execute(id);

    if (!route) {
      throw new NotFoundError(`Rute dengan id: [${id}] tidak ditemukan.`);
    }

    return {
      ...route,
    };
  }

  async getRoutesCountHandler() {
    const getRoutesTotalCountUseCase = await this._container.getInstance(
      GetRoutesTotalCountUseCase.name
    );

    const routesCount = await getRoutesTotalCountUseCase.execute();

    return {
      routesCount,
    };
  }
}

module.exports = RoutesHandler;
