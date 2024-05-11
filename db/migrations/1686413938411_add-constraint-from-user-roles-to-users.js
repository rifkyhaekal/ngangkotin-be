/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addConstraint(
    'user_roles',
    'fk_user_roles.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE RESTRICT'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('user_roles', 'fk_user_roles.user_id_users.id');
};
