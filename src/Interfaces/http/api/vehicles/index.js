const VehiclesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'vehicles',
  version: '1.0.0',
  register: async (server, { container }) => {
    const vehiclesHandler = new VehiclesHandler(container);
    server.route(routes(vehiclesHandler));
  },
};
