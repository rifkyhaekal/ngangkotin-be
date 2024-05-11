/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addConstraint(
    'user_roles',
    'fk_user_roles.role_id_roles.id',
    'FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE RESTRICT'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('user_roles', 'fk_user_roles.role_id_roles.id');
};
