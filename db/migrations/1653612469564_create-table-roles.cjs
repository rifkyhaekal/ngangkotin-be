/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('roles', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    order_number: {
      type: 'SMALLINT',
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
    is_deleted: {
      type: 'BOOLEAN',
      notNull: true,
      default: false,
    },
    modified_at: {
      type: 'BIGINT',
      notNull: false,
    },
    modified_by: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('roles', 'ifExists');
};
