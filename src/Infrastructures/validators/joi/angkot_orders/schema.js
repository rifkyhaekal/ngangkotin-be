const Joi = require('joi');
const AngkotOrderState = require('../../../../Common/enums/angkotOrderStatus');

const CreateAngkotOrderPayloadSchema = Joi.object({
  passengerId: Joi.string().length(21).required().messages({
    'string.base': 'Passenger Id tidak valid',
    'string.empty': 'Passenger Id tidak boleh kosong',
  }),
  driverId: Joi.string().length(21).required().messages({
    'string.base': 'Driver Id tidak valid',
    'string.empty': 'Driver Id tidak boleh kosong',
  }),
  pickupCoordinate: Joi.array()
    .items(Joi.any())
    .min(2)
    .max(2)
    .required()
    .messages({
      'array.base': 'Lokasi jemput tidak valid',
      'array.min': 'Lokasi jemput minimal memiliki 2 item',
      'array.max': 'Lokasi jemput maksimal memiliki 2 item',
      'any.required': 'Lokasi jemput tidak boleh kosong',
    }),
  pickupAddress: Joi.string().min(3).max(256).required().messages({
    'string.base': 'Alamat jemput tidak valid',
    'string.min': 'Alamat jemput minimal harus 3 karakter',
    'string.max': 'Alamat jemput maksimal 256 karakter',
  }),
  destinationCoordinate: Joi.array()
    .items(Joi.any())
    .min(2)
    .max(2)
    .required()
    .messages({
      'array.base': 'Lokasi tujuan tidak valid',
      'array.min': 'Lokasi tujuan minimal memiliki 2 item',
      'array.max': 'Lokasi tujuan maksimal memiliki 2 item',
      'any.required': 'Lokasi tujuan tidak boleh kosong',
    }),
  destinationAddress: Joi.string().min(3).max(256).required().messages({
    'string.base': 'Alamat tujuan tidak valid',
    'string.min': 'Alamat tujuan minimal harus 3 karakter',
    'string.max': 'Alamat tujuan maksimal 256 karakter',
  }),
  price: Joi.number().positive().required().messages({
    'number.base': 'Harga tidak valid',
    'number.positive': 'Harga harus merupakan angka positif',
    'any.required': 'Harga tidak boleh kosong',
  }),
  distance: Joi.number().positive().required().messages({
    'number.base': 'Jarak tidak valid',
    'number.positive': 'Jarak harus merupakan angka positif',
    'any.required': 'Jarak tidak boleh kosong',
  }),
  status: Joi.string()
    .valid(...Object.values(AngkotOrderState))
    .required()
    .messages({
      'any.required': 'Status harus diisi',
      'string.empty': 'Status tidak boleh kosong',
      'any.only': `Status tidak valid. Harus salah satu dari ${Object.values(
        AngkotOrderState
      ).join(', ')}`,
    }),
});

const UpdateAngkotOrderStatusToOnRidePayloadSchema = Joi.object({
  id: Joi.string().length(21).required().messages({
    'string.base': 'Id tidak valid',
    'string.empty': 'Id tidak boleh kosong',
  }),
});

const UpdateAngkotOrderStatusToCompletePayloadSchema = Joi.object({
  id: Joi.string().length(21).required().messages({
    'string.base': 'Id tidak valid',
    'string.empty': 'Id tidak boleh kosong',
  }),
});

module.exports = {
  CreateAngkotOrderPayloadSchema,
  UpdateAngkotOrderStatusToOnRidePayloadSchema,
  UpdateAngkotOrderStatusToCompletePayloadSchema,
};
