/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('routes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: false,
    },
    distance: {
      type: 'SMALLINT',
      notNull: false,
    },
    route_detail_id: {
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
    is_deleted: {
      type: 'BOOLEAN',
      notNull: true,
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
  pgm.dropTable('routes', 'ifExists');
};
