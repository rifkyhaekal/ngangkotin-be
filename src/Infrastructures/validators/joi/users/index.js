const { AddUserPayloadSchema, UpdateUserPayloadSchema } = require('./schema');
const ValidationError = require('../../../../Common/exceptions/ValidationError');

const UsersValidator = {
  validateAddUserPayload: (payload) => {
    const validationResult = AddUserPayloadSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errors = validationResult.error.details.reduce((acc, error) => {
        const { key } = error.context;
        const message = error.message.replace(/['"]/g, '');
        if (!acc[key]) {
          acc[key] = [message];
        } else {
          acc[key].push(message);
        }
        return acc;
      }, {});

      throw new ValidationError(errors);
    }
  },

  validateUpdateUserPayload: (payload) => {
    const validationResult = UpdateUserPayloadSchema.validate(payload, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errors = validationResult.error.details.reduce((acc, error) => {
        const { key } = error.context;
        const message = error.message.replace(/['"]/g, '');
        if (!acc[key]) {
          acc[key] = [message];
        } else {
          acc[key].push(message);
        }
        return acc;
      }, {});

      throw new ValidationError(errors);
    }
  },
};

module.exports = UsersValidator;
