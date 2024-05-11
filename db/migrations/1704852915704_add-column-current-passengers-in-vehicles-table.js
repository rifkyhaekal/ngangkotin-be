/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.addColumn('vehicles', {
    current_passengers: {
      type: 'SMALLINT',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('vehicles', 'current_passengers');
};
