/* eslint-disable no-underscore-dangle */
const InvalidOperationError = require('./InvalidOperationError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Token kosong'
  ),
  'NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Token tidak valid'
  ),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Harus mengirimkan username dan password'
  ),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Username dan password harus string'
  ),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvalidOperationError('Harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvalidOperationError('Refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvalidOperationError('Harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvalidOperationError('Refresh token harus string'),
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'
  ),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Tidak dapat membuat user baru karena tipe data tidak sesuai'
  ),
  'DETAIL_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat memuat detail user karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Tidak dapat memuat detail user karena tipe data tidak sesuai'
  ),
  'UPDATE_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat mengubah user karena properti yang dibutuhkan tidak ada'
  ),
  'UPDATE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Tidak dapat mengubah user karena tipe data tidak sesuai'
  ),
  'DETAIL_ROUTE.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat memuat detail rute karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_ROUTE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Tidak dapat memuat detail rute karena tipe data tidak sesuai'
  ),
  'ADD_VEHICLE_TYPE.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat membuat tipe angkot baru karena properti yang dibutuhkan tidak ada'
  ),
  'ADD_VEHICLE_TYPE.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvalidOperationError(
      'Tidak dapat membuat tipe angkot baru karena tipe data tidak sesuai'
    ),
  'DETAIL_VEHICLE_TYPE.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat memuat detail tipe angkot karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_VEHICLE_TYPE.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvalidOperationError(
      'Tidak dapat memuat detail tipe angkot karena tipe data tidak sesuai'
    ),
  'UPDATE_VEHICLE_TYPE.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat mengubah tipe angkot karena properti yang dibutuhkan tidak ada'
  ),
  'UPDATE_VEHICLE_TYPE.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvalidOperationError(
      'Tidak dapat mengubah tipe angkot karena tipe data tidak sesuai'
    ),
  'ADD_VEHICLE.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat membuat angkot baru karena properti yang dibutuhkan tidak ada'
  ),
  'ADD_VEHICLE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Tidak dapat membuat angkot baru karena tipe data tidak sesuai'
  ),
  'DETAIL_VEHICLE.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat memuat detail angkot karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_VEHICLE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Tidak dapat memuat detail angkot karena tipe data tidak sesuai'
  ),
  'UPDATE_VEHICLE.NOT_CONTAIN_NEEDED_PROPERTY': new InvalidOperationError(
    'Tidak dapat mengubah angkot karena properti yang dibutuhkan tidak ada'
  ),
  'UPDATE_VEHICLE.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvalidOperationError(
    'Tidak dapat mengubah angkot karena tipe data tidak sesuai'
  ),
};

module.exports = DomainErrorTranslator;
