const LocationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'locations',
  version: '1.0.0',
  register: async (server, { container }) => {
    const locationsHandler = new LocationsHandler(container);
    server.route(routes(locationsHandler));
  },
};
