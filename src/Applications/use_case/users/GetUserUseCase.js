const NotFoundError = require('../../../Common/exceptions/NotFoundError');
const DetailUser = require('../../../Domains/users/entities/DetailUser');

class GetUserUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this._userRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundError(`User dengan id: [${userId}] tidak ditemukan.`);
    }

    return new DetailUser(user);
  }
}

module.exports = GetUserUseCase;
