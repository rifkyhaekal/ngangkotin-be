const routes = (handler) => [
  {
    method: 'POST',
    path: '/angkotOrders',
    handler: handler.createAngkotOrderHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'PATCH',
    path: '/angkotOrders/{id}/status/onRide',
    handler: handler.updateAngkotOrderStatusToOnRideHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'PATCH',
    path: '/angkotOrders/{id}/status/complete',
    handler: handler.updateAngkotOrderStatusToCompleteHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'GET',
    path: '/angkotOrders',
    handler: handler.getAngkotOrdersHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/angkotOrders/passengers/{passengerId}',
    handler: handler.getAngkotOrdersByPassengerIdHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'GET',
    path: '/angkotOrders/drivers/{driverId}',
    handler: handler.getAngkotOrdersByDriverIdHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'GET',
    path: '/angkotOrders/{id}',
    handler: handler.getAngkotOrderByIdHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'GET',
    path: '/angkotOrders/driver/{id}',
    handler: handler.getAngkotOrderByDriverIdHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'GET',
    path: '/angkotOrders/{id}/status',
    handler: handler.getAngkotOrderStatusByIdHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
  {
    method: 'GET',
    path: '/angkotOrders/count',
    handler: handler.getAngkotOrdersCountHandler,
    options: {
      auth: 'ngangkotin_jwt_mobile',
    },
  },
];

module.exports = routes;
