const {
  AddVehicleTypePayloadSchema,
  UpdateAngkotTypePayloadSchema,
} = require('./schema');
const ValidationError = require('../../../../Common/exceptions/ValidationError');

const VehicleTypesValidator = {
  validateAddVehicleTypePayload: (payload) => {
    const validationResult = AddVehicleTypePayloadSchema.validate(payload, {
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
  validateUpdateVehicleTypePayload: (payload) => {
    const validationResult = UpdateAngkotTypePayloadSchema.validate(payload, {
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

module.exports = VehicleTypesValidator;
