/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    email: {
      type: 'VARCHAR(80)',
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: false,
    },
    phone_number: {
      type: 'VARCHAR(15)',
      notNull: false,
    },
    profile_photo_url: {
      type: 'TEXT',
      notNull: false,
    },
    is_email_verified: {
      type: 'BOOLEAN',
      notNull: false,
    },
    gender: {
      type: 'BOOLEAN',
      notNull: false,
    },
    address: {
      type: 'TEXT',
      notNull: false,
    },
    id_card_number: {
      type: 'VARCHAR(16)',
      notNull: false,
    },
    date_of_birth: {
      type: 'DATE',
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
  pgm.dropTable('users', 'ifExists');
};
