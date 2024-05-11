/* eslint-disable camelcase */
const { nanoid } = require('nanoid');

exports.up = (pgm) => {
  const vehicleId = nanoid(21);
  const registrationNumber = 'Z 1234 YTA';
  const totalPassengers = 12;
  const condition = 'good';
  const brand = 'Toyota';
  const createdBy = 'seeder';
  const isDeleted = false;

  const query = {
    text: 'INSERT INTO vehicles(id, registration_number, total_passengers, condition, brand, created_at, created_by, is_deleted, modified_at, modified_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
    values: [
      vehicleId,
      registrationNumber,
      totalPassengers,
      condition,
      brand,
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
  const queryTruncate = {
    text: 'TRUNCATE TABLE vehicles',
  };

  pgm.db.query(queryTruncate);
};
