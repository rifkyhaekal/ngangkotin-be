const NotFoundError = require('../../../Common/exceptions/NotFoundError');

class DeleteUserUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userId) {
    const isUserExist = await this._userRepository.verifyUserIsExist(userId);

    if (!isUserExist) {
      throw new NotFoundError('Angkot tidak ditemukan.');
    }

    await this._userRepository.deleteUser(userId);
  }
}

module.exports = DeleteUserUseCase;
