const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/users/delete',
    handler: handler.deleteUsersHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.updateUserHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUserHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersByRoleNameHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users/{roleName}/list',
    handler: handler.getUserListByRoleNameHandler,
    options: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
  {
    method: 'GET',
    path: '/users/{roleName}/count',
    handler: handler.getUserTotalCountByRoleNameHandler,
    options: {
      auth: 'ngangkotin_jwt',
    },
  },
];

module.exports = routes;
