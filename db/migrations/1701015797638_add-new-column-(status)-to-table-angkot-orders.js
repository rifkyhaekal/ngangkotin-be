/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addColumn('angkotorders', {
    status: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('angkotorders', 'status');
};
