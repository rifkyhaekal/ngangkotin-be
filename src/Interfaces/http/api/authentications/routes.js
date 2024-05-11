const routes = (handler) => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/authentications',
    handler: handler.reAuthenticationHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/authentications/mobile',
    handler: handler.reAuthenticationHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'DELETE',
    path: '/authentications/{id}',
    handler: handler.deleteAuthenticationHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
];

module.exports = routes;
