/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addConstraint(
    'routes',
    'fk_routes.route_detail_id_routes_details.id',
    'FOREIGN KEY(route_detail_id) REFERENCES route_details(id) ON DELETE RESTRICT'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('routes', 'fk_routes.route_detail_id_routes_details.id');
};
