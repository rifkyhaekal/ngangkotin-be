const Joi = require('joi');

const AddUserPayloadSchema = Joi.object({
  name: Joi.string().min(2).max(60).required().messages({
    'string.base': 'Nama harus berupa string',
    'string.min': 'Nama minimal harus 2 huruf',
    'string.max': 'Nama maksimal 60 huruf',
  }),
  email: Joi.string().email().min(5).max(60).required().messages({
    'string.base': 'Email tidak valid',
    'string.min': 'Email minimal harus 5 huruf',
    'string.max': 'Email maksimal 60 huruf',
  }),
  password: Joi.string()
    .min(6)
    .max(250)
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/)
    .required()
    .messages({
      'string.base': 'Password tidak valid',
      'string.min': 'Password minimal harus 6 karakter',
      'string.max': 'Password maksimal 250 karakter',
      'string.pattern.base':
        'Password harus mengandung setidaknya satu angka, satu simbol, dan satu huruf kapital',
    }),
  confirmPassword: Joi.string()
    .equal(Joi.ref('password'))
    .allow(null)
    .messages({
      'any.only': 'Konfirmasi password harus sama dengan password',
    }),
  gender: Joi.boolean().allow(null).messages({
    'boolena.base': 'Jenis kelamin tidak valid',
  }),
  address: Joi.string().min(5).max(200).allow(null).messages({
    'string.base': 'Alamat tidak valid',
    'string.min': 'Alamat minimal harus 5 huruf',
    'string.max': 'Alamat maksimal 200 huruf',
  }),
  phoneNumber: Joi.string().min(8).max(15).allow(null).messages({
    'string.base': 'Nomor handphone tidak valid',
    'string.min': 'Nomor handphone minimal harus 8 digit',
    'string.max': 'Nomor handphone maksimal 12 digit',
  }),
  idCardNumber: Joi.string().length(16).allow(null).messages({
    'string.base': 'No. KTP tidak valid',
    'string.length': 'No. KTP harus 16 digit',
  }),
  profilePhotoUrl: Joi.string().allow(null).messages({
    'string.base': 'Url foto tidak valid',
  }),
  isEmailVerified: Joi.boolean().allow(null).messages({
    'boolean.base': 'Status verifikasi email tidak valid',
  }),
  dateOfBirth: Joi.date().max('now').allow(null).messages({
    'date.base': 'Tanggal lahir harus valid',
    'date.max': 'Tanggal lahir tidak bisa dari masa depan',
  }),
  roleName: Joi.string().required().messages({
    'string.base': 'Role tidak valid',
    'string.empty': 'Role tidak boleh kosong',
  }),
});

const UpdateUserPayloadSchema = Joi.object({
  id: Joi.string().length(21).required().messages({
    'string.base': 'Id tidak valid',
    'string.empty': 'Id tidak boleh kosong',
  }),
  name: Joi.string().min(3).max(60).required().messages({
    'string.base': 'Nama harus berupa string',
    'string.min': 'Nama minimal harus 3 huruf',
    'string.max': 'Nama maksimal 60 huruf',
  }),
  email: Joi.string().email().min(5).max(60).required().messages({
    'string.base': 'Email tidak valid',
    'string.min': 'Email minimal harus 5 huruf',
    'string.max': 'Email maksimal 60 huruf',
  }),
  gender: Joi.boolean().allow(null).messages({
    'boolena.base': 'Jenis kelamin tidak valid',
  }),
  address: Joi.string().min(5).max(200).allow(null).messages({
    'string.base': 'Alamat tidak valid',
    'string.min': 'Alamat minimal harus 5 huruf',
    'string.max': 'Alamat maksimal 200 huruf',
  }),
  phoneNumber: Joi.string().min(8).max(17).allow(null).messages({
    'string.base': 'Nomor handphone tidak valid',
    'string.min': 'Nomor handphone minimal harus 8 digit',
    'string.max': 'Nomor handphone maksimal 12 digit',
  }),
  idCardNumber: Joi.string().length(16).allow(null).messages({
    'string.base': 'No. KTP tidak valid',
    'string.length': 'No. KTP harus 16 digit',
  }),
  dateOfBirth: Joi.date().max('now').allow(null).messages({
    'date.base': 'Tanggal lahir harus valid',
    'date.max': 'Tanggal lahir tidak bisa dari masa depan',
  }),
});

module.exports = { AddUserPayloadSchema, UpdateUserPayloadSchema };
