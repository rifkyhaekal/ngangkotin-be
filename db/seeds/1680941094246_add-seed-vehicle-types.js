/* eslint-disable camelcase */
const { nanoid } = require('nanoid');

exports.up = (pgm) => {
  const vehicleTypeId = nanoid(21);
  const code = '012';
  const colorName = 'Hijau Tua';
  const colorHex = '#123327';
  const createdBy = 'seeder';
  const isDeleted = false;

  const query = {
    text: 'INSERT INTO vehicle_types(id, code, color_name, color_hex, created_at, created_by, is_deleted, modified_at, modified_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
    values: [
      vehicleTypeId,
      code,
      colorName,
      colorHex,
      Date.now(),
      createdBy,
      isDeleted,
      null,
      null,
    ],
  };

  pgm.db.query(query);
};

exports.down = (pgm) => {
  pgm.dropTable('vehicle_types', 'ifExists');
};
