/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addConstraint(
    'angkotorders',
    'fk_angkotorders.passenger_id_users.id',
    'FOREIGN KEY(passenger_id) REFERENCES users(id) ON DELETE RESTRICT'
  );

  pgm.addConstraint(
    'angkotorders',
    'fk_angkotorders.driver_id_users.id',
    'FOREIGN KEY(driver_id) REFERENCES users(id) ON DELETE RESTRICT'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('angkotorders', 'fk_angkotorders.passenger_id_users.id');
  pgm.dropConstraint('angkotorders', 'fk_angkotorders.driver_id_users.id');
};
