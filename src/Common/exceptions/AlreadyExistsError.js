const ClientError = require('./ClientError');

class AlreadyExistsError extends ClientError {
  constructor(message) {
    super(message, 409);
    this.name = 'AlreadyExistsError';
  }
}

module.exports = AlreadyExistsError;
