const Joi = require('joi');

const AddVehicleTypePayloadSchema = Joi.object({
  code: Joi.string().min(1).max(4).required().messages({
    'string.base': 'Kode angkot tidak valid',
    'string.min': 'Kode angkot minimal harus 1 karakter',
    'string.max': 'Kode angkot maksimal 4 karakter',
  }),
  colorName: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Nama warna kendaraan tidak valid',
    'string.min': 'Nama warna kendaraan minimal harus 3 karakter',
    'string.max': 'Nama warna kendaraan maksimal 50 karakter',
  }),
  colorHex: Joi.string().min(4).max(7).required().messages({
    'string.base': 'Kode warna hexadesimal tidak valid',
    'string.min': 'Kode warna hexadesimal minimal harus 4 karakter',
    'string.max': 'Kode warna hexadesimal maksimal 7 karakter',
  }),
  routeId: Joi.string().length(21).required().messages({
    'string.base': 'Rute tidak valid',
    'string.empty': 'Rute tidak boleh kosong',
  }),
});

const UpdateAngkotTypePayloadSchema = Joi.object({
  id: Joi.string().length(21).required().messages({
    'string.base': 'Id tidak valid',
    'string.empty': 'Id tidak boleh kosong',
  }),
  code: Joi.string().min(1).max(4).required().messages({
    'string.base': 'Kode angkot tidak valid',
    'string.min': 'Kode angkot minimal harus 1 karakter',
    'string.max': 'Kode angkot maksimal 4 karakter',
  }),
  colorName: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Nama warna kendaraan tidak valid',
    'string.min': 'Nama warna kendaraan minimal harus 3 karakter',
    'string.max': 'Nama warna kendaraan maksimal 50 karakter',
  }),
  colorHex: Joi.string().min(4).max(7).required().messages({
    'string.base': 'Kode warna hexadesimal tidak valid',
    'string.min': 'Kode warna hexadesimal minimal harus 4 karakter',
    'string.max': 'Kode warna hexadesimal maksimal 7 karakter',
  }),
  routeId: Joi.string().length(21).required().messages({
    'string.base': 'Rute tidak valid',
    'string.empty': 'Rute tidak boleh kosong',
  }),
});

module.exports = { AddVehicleTypePayloadSchema, UpdateAngkotTypePayloadSchema };
