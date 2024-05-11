/* eslint-disable no-unused-vars */
class RouteRepository {
  async deleteRoute(routeId) {
    throw new Error('ROUTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteRoutes(routeIds) {
    throw new Error('ROUTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRoutes(pageSize, skip, sort, sortBy, search) {
    throw new Error('ROUTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRoutesList() {
    throw new Error('ROUTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRoute(routeId) {
    throw new Error('ROUTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyRouteIsExist(routeId) {
    throw new Error('ROUTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRoutesTotalCount() {
    throw new Error('ROUTE_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = RouteRepository;
