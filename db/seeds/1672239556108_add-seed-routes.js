/* eslint-disable camelcase */
const { nanoid } = require('nanoid');
const routeCoordinates = require('../seedData/routeData');

exports.up = (pgm) => {
  const routeId = nanoid(21);
  const routeDetailsId = nanoid(21);
  const name = 'Pasar Cikurubuk - Nyantong';
  const distance = 16;
  const description =
    'Terminal Cikurubuk – Jl. Residen Ardiwinangun – Belok kanan Jl. Situ Gede – Belok kiri Jl. Letkol RE. Jaelani – Belok kanan Jl. Cieunteung – Belok kanan Jl. Bebedilan – Jl. Jiwa Besar – Belok kiri Jl. Paseh – Belok kiri Jl. Veteran – Belok kanan Jl. Cihideung Balong – Belok kanan Jl. KHZ. Mustofa – Belok kiri Jl. Siliwangi – Nyantong – Jl. Siliwangi – Jl. Benda – Belok kiri Jl. Sutisna Senjaya – Jl. Oto Iskandar Dinata – Belok kanan Jl. Dr. Sukarjo – Simpang Lima – Belok kiri Jl. Kapten Naseh – Belok kiri Jl. Mitra Batik – Belok kanan Jl. Bantar – Belok kiri Jl. Cieunteung – Belok kanan Jl. Letkol RE. Jaelani – Jl. Raya Timur Cikurubuk – Belok kanan Jl. A. H. Witono – Terminal Cikurubuk';
  const createdBy = 'seeder';
  const isDeleted = false;

  const jsonData = JSON.stringify(routeCoordinates);

  const queryRouteDetails = {
    text: 'INSERT INTO route_details(id, coordinates, created_at, created_by) VALUES($1, $2, $3, $4) RETURNING id',
    values: [routeDetailsId, jsonData, Date.now(), createdBy],
  };

  pgm.db.query(queryRouteDetails);

  const queryRoutes = {
    text: 'INSERT INTO routes VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
    values: [
      routeId,
      name,
      description,
      distance,
      routeDetailsId,
      Date.now(),
      createdBy,
      isDeleted,
      null,
      null,
    ],
  };

  pgm.db.query(queryRoutes);
};

exports.down = (pgm) => {
  const queryTruncate = {
    text: 'TRUNCATE TABLE route_details, routes',
  };

  pgm.db.query(queryTruncate);

  const querySerial = {
    text: 'ALTER SEQUENCE route_details_order_number_seq RESTART WITH 1',
  };

  pgm.db.query(querySerial);
};
