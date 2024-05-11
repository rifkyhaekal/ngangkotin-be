const ListResponse = require('../../../Common/responses/ListResponse');

class GetUsersListByRoleNameUseCase {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async execute(roleName) {
    const usersList = await this._userRepository.getUsersListByRoleName(
      roleName
    );

    return new ListResponse(usersList);
  }
}

module.exports = GetUsersListByRoleNameUseCase;
