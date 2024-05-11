const Joi = require('joi');

const PaginationRequestQuerySchema = Joi.object({
  page: Joi.number().integer(),
  pageSize: Joi.number().integer(),
  sort: Joi.string().allow(''),
  sortBy: Joi.string().allow(''),
  search: Joi.string().allow(''),
  roleName: Joi.string().allow(null),
});

module.exports = {
  PaginationRequestQuerySchema,
};
