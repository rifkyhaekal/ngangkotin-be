const RoutesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'routes',
  version: '1.0.0',
  register: async (server, { container }) => {
    const routesHandler = new RoutesHandler(container);
    server.route(routes(routesHandler));
  },
};
