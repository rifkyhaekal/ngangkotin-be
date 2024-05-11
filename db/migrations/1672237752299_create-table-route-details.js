/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('route_details', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    coordinates: {
      type: 'JSONB',
      notNull: true,
    },
    created_at: {
      type: 'BIGINT',
      notNull: true,
    },
    created_by: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('route_details', 'ifExists');
};
