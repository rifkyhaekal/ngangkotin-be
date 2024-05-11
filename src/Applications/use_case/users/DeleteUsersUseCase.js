class DeleteUsersUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(userIds) {
    const result = await this._userRepository.deleteUsers(userIds);

    return result;
  }
}

module.exports = DeleteUsersUseCase;
