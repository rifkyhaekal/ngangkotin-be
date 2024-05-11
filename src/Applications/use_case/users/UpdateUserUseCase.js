const UpdateUser = require('../../../Domains/users/entities/UpdateUser');

class UpdateUserUseCase {
  constructor({ userRepository, userValidator }) {
    this._userRepository = userRepository;
    this._userValidator = userValidator;
  }

  async execute(payload) {
    await this._userValidator.validateUpdateUserPayload(payload);

    const updateUser = new UpdateUser(payload);
    return this._userRepository.updateUser(updateUser);
  }
}

module.exports = UpdateUserUseCase;
