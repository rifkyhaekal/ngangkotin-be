const ClientError = require('./ClientError');

class ValidationError extends ClientError {
  constructor(errors) {
    super('', 422);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

module.exports = ValidationError;
