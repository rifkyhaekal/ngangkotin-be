const ClientError = require('./ClientError');

class MismatchError extends ClientError {
  constructor(message) {
    super(message, 422);
    this.name = 'MismatchError';
  }
}

module.exports = MismatchError;
