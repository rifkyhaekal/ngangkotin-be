class UserLogin {
  constructor(payload) {
    this._verifyPayload(payload);

    this.email = payload.email;
    this.password = payload.password;
    this.roleName = payload.roleName;
  }

  _verifyPayload(payload) {
    const { email, password, roleName } = payload;

    if (!email || !password || !roleName) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !roleName
    ) {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserLogin;
