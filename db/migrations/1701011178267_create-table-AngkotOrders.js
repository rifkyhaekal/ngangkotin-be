/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('angkotorders', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    passenger_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    driver_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    pickup_coordinate: {
      type: 'DOUBLE PRECISION[]',
      notNull: true,
    },
    pickup_address: {
      type: 'TEXT',
      notNull: true,
    },
    destination_coordinate: {
      type: 'DOUBLE PRECISION[]',
      notNull: true,
    },
    destination_address: {
      type: 'TEXT',
      notNull: true,
    },
    price: {
      type: 'NUMERIC',
      notNull: true,
    },
    distance: {
      type: 'DOUBLE PRECISION',
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
  pgm.dropTable('angkotorders', 'ifExists');
};
