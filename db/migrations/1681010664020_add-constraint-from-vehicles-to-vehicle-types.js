/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addConstraint(
    'vehicles',
    'fk_vehicles.vehicle_type_id_vehicles.id',
    'FOREIGN KEY(vehicle_type_id) REFERENCES vehicle_types(id) ON DELETE RESTRICT'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('vehicles', 'fk_vehicles.vehicle_type_id_vehicles.id');
};
