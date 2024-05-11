const routes = (handler) => [
  {
    method: 'POST',
    path: '/locations',
    handler: handler.setLocationHandler,
    config: {
      id: 'locations',
    },
  },
  {
    method: 'GET',
    path: '/locations/{id}',
    handler: handler.getLocationByIdHandler,
    config: {
      id: 'get-locations',
    },
  },
];

module.exports = routes;
