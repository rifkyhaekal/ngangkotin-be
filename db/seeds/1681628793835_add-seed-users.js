/* eslint-disable camelcase */
const { nanoid } = require('nanoid');
const { faker } = require('@faker-js/faker/locale/id_ID');
const bcrypt = require('bcrypt');

exports.up = async (pgm) => {
  const adminId = nanoid(21);
  const adminEmail = 'haekalhaekal001@gmail.com';
  const createdBy = 'seeder';
  const pass = await bcrypt.hash('02#Haha#24', 10);

  const adminUserRoleId = nanoid(21);
  const adminRoleId = nanoid(21);
  const adminRoleName = 'Admin';
  const adminPassword = pass;
  const adminRoleON = 1;

  const driverRoleId = nanoid(21);
  const driverRoleName = 'Driver';
  const driverRoleON = 2;

  const passengerRoleId = nanoid(21);
  const passengerRoleName = 'Passenger';
  const passengerRoleON = 3;

  function generateIdentityNumber() {
    let identityNumber = '';

    while (identityNumber.length < 16) {
      identityNumber += faker.datatype.number({ min: 0, max: 9 }).toString();
    }

    return identityNumber;
  }

  const adminQuery = {
    text: 'INSERT INTO users(id, email, password, created_at, created_by) VALUES($1, $2, $3, $4, $5) RETURNING id',
    values: [adminId, adminEmail, adminPassword, Date.now(), createdBy],
  };

  pgm.db.query(adminQuery);

  const adminRoleQuery = {
    text: 'INSERT INTO roles VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
    values: [
      adminRoleId,
      adminRoleName,
      adminRoleON,
      Date.now(),
      createdBy,
      false,
      null,
      null,
    ],
  };

  pgm.db.query(adminRoleQuery);

  const userRoleAdminQuery = {
    text: 'INSERT INTO user_roles VALUES($1, $2, $3, $4, $5) RETURNING id',
    values: [adminUserRoleId, adminId, adminRoleId, Date.now(), createdBy],
  };

  pgm.db.query(userRoleAdminQuery);

  const driverRoleQuery = {
    text: 'INSERT INTO roles VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
    values: [
      driverRoleId,
      driverRoleName,
      driverRoleON,
      Date.now(),
      createdBy,
      false,
      null,
      null,
    ],
  };

  pgm.db.query(driverRoleQuery);

  for (let i = 1; i <= 20; i++) {
    const driverId = nanoid(21);
    const driverUserRoleId = nanoid(21);
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = pass;
    const gender = faker.datatype.boolean();
    const address = `${faker.address.streetAddress()}, ${faker.address.cityName()}.`;
    const phoneNumber = faker.phone.number('+62###########');
    const idCardNumber = generateIdentityNumber();
    const dateBirth = faker.date.between('1960-01-01', '2004-01-01');
    const isDeleted = false;

    const driverQuery = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id',
      values: [
        driverId,
        name,
        email,
        password,
        phoneNumber,
        null,
        null,
        gender,
        address,
        idCardNumber,
        dateBirth,
        Date.now(),
        createdBy,
        isDeleted,
        null,
        null,
      ],
    };

    pgm.db.query(driverQuery);

    const userRoleDriverQuery = {
      text: 'INSERT INTO user_roles VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [driverUserRoleId, driverId, driverRoleId, Date.now(), createdBy],
    };

    pgm.db.query(userRoleDriverQuery);
  }

  const passengerRoleQuery = {
    text: 'INSERT INTO roles VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
    values: [
      passengerRoleId,
      passengerRoleName,
      passengerRoleON,
      Date.now(),
      createdBy,
      false,
      null,
      null,
    ],
  };

  pgm.db.query(passengerRoleQuery);

  for (let i = 1; i <= 20; i++) {
    const passengerId = nanoid(21);
    const passengerUserRoleId = nanoid(21);
    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password = pass;
    const isDeleted = false;

    const queryPassengers = {
      text: 'INSERT INTO users(id, name, email, password,created_at, created_by, is_deleted, modified_at, modified_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [
        passengerId,
        name,
        email,
        password,
        Date.now(),
        createdBy,
        isDeleted,
        null,
        null,
      ],
    };

    pgm.db.query(queryPassengers);

    const userRolePassengerQuery = {
      text: 'INSERT INTO user_roles VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [
        passengerUserRoleId,
        passengerId,
        passengerRoleId,
        Date.now(),
        createdBy,
      ],
    };

    pgm.db.query(userRolePassengerQuery);
  }
};

exports.down = (pgm) => {
  const queryRolesTruncate = {
    text: 'TRUNCATE TABLE roles CASCADE',
  };

  pgm.db.query(queryRolesTruncate);

  const queryTruncate = {
    text: 'TRUNCATE TABLE users CASCADE',
  };

  pgm.db.query(queryTruncate);

  const queryUserRolesTruncate = {
    text: 'TRUNCATE TABLE user_roles',
  };

  pgm.db.query(queryUserRolesTruncate);
};
