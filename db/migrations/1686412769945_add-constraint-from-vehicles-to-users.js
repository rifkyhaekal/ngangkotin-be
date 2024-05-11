/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addConstraint(
    'vehicles',
    'fk_vehicles.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('vehicles', 'fk_vehicles.user_id_users.id');
};
