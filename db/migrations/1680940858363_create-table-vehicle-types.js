/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('vehicle_types', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    code: {
      type: 'VARCHAR(10)',
      notNull: true,
    },
    color_name: {
      type: 'VARCHAR(30)',
      notNull: true,
    },
    color_hex: {
      type: 'VARCHAR(7)',
      notNull: true,
    },
    route_id: {
      type: 'VARCHAR(50)',
      notNull: false,
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
  pgm.dropTable('vehicle_types', 'ifExists');
};
