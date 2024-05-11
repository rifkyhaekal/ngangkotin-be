const routes = (handler) => [
  {
    method: 'POST',
    path: '/angkotTypes',
    handler: handler.addVehicleTypeHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'POST',
    path: '/angkotTypes/delete',
    handler: handler.deleteVehicleTypesHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/angkotTypes/{id}',
    handler: handler.updateVehicleTypeHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/angkotTypes/{id}',
    handler: handler.deleteVehicleTypeHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/angkotTypes',
    handler: handler.getVehicleTypesHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/angkotTypes/{id}',
    handler: handler.getVehicleTypeByIdHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/angkotTypes/list',
    handler: handler.getVehicleTypesListHandler,
    options: {
      auth: false,
    },
  },
];

module.exports = routes;
