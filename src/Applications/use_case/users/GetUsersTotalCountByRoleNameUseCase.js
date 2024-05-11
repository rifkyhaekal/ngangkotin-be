class GetUsersTotalCountByRoleNameUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(roleName) {
    const totalCount = await this._userRepository.getUsersTotalCountByRoleName(
      roleName
    );

    return totalCount;
  }
}

module.exports = GetUsersTotalCountByRoleNameUseCase;
