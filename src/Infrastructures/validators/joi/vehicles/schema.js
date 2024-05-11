const Joi = require('joi');
const ConditionState = require('../../../../Common/enums/conditions');

const AddVehiclePayloadSchema = Joi.object({
  registrationNumber: Joi.string().min(3).max(14).required().messages({
    'string.base': 'Nomor kendaraan harus berupa string',
    'string.min': 'Nomor kendaraan minimal harus 3 karakter',
    'string.max': 'Nomor kendaraan maksimal 12 karakter',
  }),
  totalPassengers: Joi.number().min(1).max(12).required().messages({
    'number.base': 'Total penumpang tidak valid',
    'number.min': 'Total penumpang minimal harus 1',
    'number.max': 'Total penumpang maksimal harus 12',
  }),
  condition: Joi.string()
    .valid(...Object.values(ConditionState))
    .required()
    .messages({
      'any.required': 'Kondisi harus diisi',
      'string.empty': 'Kondisi tidak boleh kosong',
      'any.only': `Kondisi tidak valid. Harus salah satu dari ${Object.values(
        ConditionState
      ).join(', ')}`,
    }),
  brand: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Brand kendaraan tidak valid',
    'string.min': 'Brand kendaraan minimal harus 3 karakter',
    'string.max': 'Brand kendaraan maksimal 50 karakter',
  }),
  vehicleTypeId: Joi.string().length(21).required().messages({
    'string.base': 'Tipe angkot tidak valid',
    'string.empty': 'Tipe angkot tidak boleh kosong',
  }),
  driverId: Joi.string().length(21).required().messages({
    'string.base': 'Driver tidak valid',
    'string.empty': 'Driver tidak boleh kosong',
  }),
});

const UpdateVehiclePayloadSchema = Joi.object({
  id: Joi.string().length(21).required().messages({
    'string.base': 'Id tidak valid',
    'string.empty': 'Id tidak boleh kosong',
  }),
  registrationNumber: Joi.string().min(3).max(14).required().messages({
    'string.base': 'Nomor kendaraan harus berupa string',
    'string.min': 'Nomor kendaraan minimal harus 3 karakter',
    'string.max': 'Nomor kendaraan maksimal 12 karakter',
  }),
  totalPassengers: Joi.number().min(1).max(12).required().messages({
    'number.base': 'Total penumpang tidak valid',
    'number.min': 'Total penumpang minimal harus 1',
    'number.max': 'Total penumpang maksimal harus 12',
  }),
  condition: Joi.string()
    .valid(...Object.values(ConditionState))
    .required()
    .messages({
      'any.required': 'Kondisi harus diisi',
      'string.empty': 'Kondisi tidak boleh kosong',
      'any.only': `Kondisi tidak valid. Harus salah satu dari ${Object.values(
        ConditionState
      ).join(', ')}`,
    }),
  brand: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Brand kendaraan tidak valid',
    'string.min': 'Brand kendaraan minimal harus 3 karakter',
    'string.max': 'Brand kendaraan maksimal 50 karakter',
  }),
  vehicleTypeId: Joi.string().length(21).required().messages({
    'string.base': 'Tipe angkot tidak valid',
    'string.empty': 'Tipe angkot tidak boleh kosong',
  }),
  driverId: Joi.string().length(21).required().messages({
    'string.base': 'Driver tidak valid',
    'string.empty': 'Driver tidak boleh kosong',
  }),
});

module.exports = { AddVehiclePayloadSchema, UpdateVehiclePayloadSchema };
