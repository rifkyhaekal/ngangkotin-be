/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('vehicles', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    registration_number: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    total_passengers: {
      type: 'SMALLINT',
      notNull: true,
    },
    condition: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    brand: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    photo_url: {
      type: 'TEXT',
      notNull: false,
    },
    vehicle_type_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    user_id: {
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
  pgm.dropTable('vehicles', 'ifExists');
};
