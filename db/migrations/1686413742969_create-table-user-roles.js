/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('user_roles', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    role_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    created_at: {
      type: 'BIGINT',
      notNull: true,
    },
    created_by: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_roles', 'ifExists');
};
