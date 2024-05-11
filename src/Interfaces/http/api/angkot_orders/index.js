const AngkotOrdersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'angkotOrders',
  version: '1.0.0',
  register: async (server, { container }) => {
    const angkotOrdersHandler = new AngkotOrdersHandler(container);
    server.route(routes(angkotOrdersHandler));
  },
};
