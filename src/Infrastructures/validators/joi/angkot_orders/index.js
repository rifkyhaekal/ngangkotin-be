const {
  CreateAngkotOrderPayloadSchema,
  UpdateAngkotOrderStatusToOnRidePayloadSchema,
  UpdateAngkotOrderStatusToCompletePayloadSchema,
} = require('./schema');
const ValidationError = require('../../../../Common/exceptions/ValidationError');

const AngkotOrdersValidator = {
  validateCreateAngkotOrderPayload: (payload) => {
    const validationResult = CreateAngkotOrderPayloadSchema.validate(payload, {
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
  validateUpdateAngkotOrderStatusOnRidePayload: (payload) => {
    const validationResult =
      UpdateAngkotOrderStatusToOnRidePayloadSchema.validate(payload, {
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
  validateUpdateAngkotOrderStatusCompletePayload: (payload) => {
    const validationResult =
      UpdateAngkotOrderStatusToCompletePayloadSchema.validate(payload, {
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

module.exports = AngkotOrdersValidator;
