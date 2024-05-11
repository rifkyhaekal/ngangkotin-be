const autoBind = require('auto-bind');
const AddUserUseCase = require('../../../../Applications/use_case/users/AddUserUseCase');
const UpdateUserUseCase = require('../../../../Applications/use_case/users/UpdateUserUseCase');
const DeleteUserUseCase = require('../../../../Applications/use_case/users/DeleteUserUseCase');
const DeleteUsersUseCase = require('../../../../Applications/use_case/users/DeleteUsersUseCase');
const GetUsersByRoleNameUseCase = require('../../../../Applications/use_case/users/GetUsersByRoleNameUseCase');
const GetUsersListByRoleNameUseCase = require('../../../../Applications/use_case/users/GetUsersListByRoleNameUseCase');
const GetUserUseCase = require('../../../../Applications/use_case/users/GetUserUseCase');
const GetUsersTotalCountByRoleNameUseCase = require('../../../../Applications/use_case/users/GetUsersTotalCountByRoleNameUseCase');
const MismatchError = require('../../../../Common/exceptions/MismatchError');

class UsersHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postUserHandler({ payload }, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const userId = await addUserUseCase.execute(payload);

    const response = h.response({
      userId,
    });
    response.code(201);
    return response;
  }

  async updateUserHandler({ payload, params }, h) {
    const { id } = params;

    if (id !== payload.id) {
      throw new MismatchError('Id pada path tidak sama dengan di payload');
    }

    const updateUserUseCase = this._container.getInstance(
      UpdateUserUseCase.name
    );

    await updateUserUseCase.execute(payload);

    return h.response().code(204).takeover();
  }

  async deleteUserHandler({ params }, h) {
    const { id } = params;

    const deleteUserUseCase = this._container.getInstance(
      DeleteUserUseCase.name
    );

    await deleteUserUseCase.execute(id);

    return h.response().code(204).takeover();
  }

  async deleteUsersHandler({ payload }, h) {
    const deleteUsersUseCase = this._container.getInstance(
      DeleteUsersUseCase.name
    );

    const usersDeleted = await deleteUsersUseCase.execute(payload.ids);

    const response = h.response({
      usersDeleted: usersDeleted,
    });

    response.code(200);
    return response;
  }

  async getUsersByRoleNameHandler({ query }) {
    const getUsersByRoleNameUseCase = this._container.getInstance(
      GetUsersByRoleNameUseCase.name
    );
    const paginatedListResponse = await getUsersByRoleNameUseCase.execute(
      query
    );

    return {
      items: paginatedListResponse.items,
      totalCount: paginatedListResponse.totalCount,
    };
  }

  async getUserListByRoleNameHandler({ params }) {
    const { roleName } = params;

    const getUserListByRoleNameUseCase = await this._container.getInstance(
      GetUsersListByRoleNameUseCase.name
    );

    const usersList = await getUserListByRoleNameUseCase.execute(roleName);

    return {
      ...usersList,
    };
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;

    const getUserUseCase = await this._container.getInstance(
      GetUserUseCase.name
    );

    const user = await getUserUseCase.execute(id);

    const lastModified =
      user.modifiedAt !== null ? user.modifiedAt : user.createdAt;

    if (request.headers['if-none-match'] == lastModified) {
      return h.response().code(304);
    }

    const response = h
      .response({
        ...user,
      })
      .etag(lastModified);

    return response;
  }

  async getUserTotalCountByRoleNameHandler({ params }) {
    const { roleName } = params;

    const getUsersTotalCountByRoleNameUseCase =
      await this._container.getInstance(
        GetUsersTotalCountByRoleNameUseCase.name
      );

    const count = await getUsersTotalCountByRoleNameUseCase.execute(roleName);

    return {
      usersCount: count,
    };
  }
}

module.exports = UsersHandler;
