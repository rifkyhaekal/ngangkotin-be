const ClientError = require('./ClientError');

class InvalidOperationError extends ClientError {
  constructor(message) {
    super(message, 422);
    this.name = 'InvalidOperationError';
  }
}

module.exports = InvalidOperationError;
