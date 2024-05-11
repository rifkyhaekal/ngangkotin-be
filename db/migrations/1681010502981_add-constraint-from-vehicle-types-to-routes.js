/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addConstraint(
    'vehicle_types',
    'fk_vehicle_types.route_id_routes.id',
    'FOREIGN KEY(route_id) REFERENCES routes(id) ON DELETE RESTRICT'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('vehicle_types', 'fk_vehicle_types.route_id_routes.id');
};
