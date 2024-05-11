const VehicleTypesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'vehicleTypes',
  version: '1.0.0',
  register: async (server, { container }) => {
    const vehicleTypesHandler = new VehicleTypesHandler(container);
    server.route(routes(vehicleTypesHandler));
  },
};
