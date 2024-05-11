const routes = (handler) => [
  {
    method: 'POST',
    path: '/routes/delete',
    handler: handler.deleteRoutesHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/routes/{id}',
    handler: handler.deleteRouteHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/routes',
    handler: handler.getRoutesHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/routes/list',
    handler: handler.getRoutesListHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/routes/{id}',
    handler: handler.getRouteByIdHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/routes/{id}/mobile',
    handler: handler.getRouteByIdHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'GET',
    path: '/routes/count',
    handler: handler.getRoutesCountHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
];

module.exports = routes;
