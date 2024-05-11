const {
  AddVehiclePayloadSchema,
  UpdateVehiclePayloadSchema,
} = require('./schema');
const ValidationError = require('../../../../Common/exceptions/ValidationError');

const VehiclesValidator = {
  validateAddVehiclePayload: (payload) => {
    const validationResult = AddVehiclePayloadSchema.validate(payload, {
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
  validateUpdateVehiclePayload: (payload) => {
    const validationResult = UpdateVehiclePayloadSchema.validate(payload, {
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

module.exports = VehiclesValidator;
