const ClientError = require('./ClientError');

class ArgumentError extends ClientError {
  constructor(message) {
    super(message, 422);
    this.name = 'ArgumentError';
  }
}

module.exports = ArgumentError;
