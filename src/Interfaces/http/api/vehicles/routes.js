const routes = (handler) => [
  {
    method: 'POST',
    path: '/angkots',
    handler: handler.addVehicleHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'POST',
    path: '/angkots/delete',
    handler: handler.deleteVehiclesHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/angkots/{id}',
    handler: handler.updateVehicleHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/angkots/{id}',
    handler: handler.deleteVehicleHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/angkots',
    handler: handler.getVehiclesHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/angkots/{id}',
    handler: handler.getVehicleByIdHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/angkots/list',
    handler: handler.getVehiclesListHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/angkots/count',
    handler: handler.getVehiclesCountHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      return 'Hello world!';
    },
    options: {
      auth: false,
    },
  },
];

module.exports = routes;
