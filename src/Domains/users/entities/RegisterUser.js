class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      name,
      email,
      password,
      confirmPassword,
      phoneNumber = null,
      profilePhotoUrl = null,
      isEmailVerified = false,
      gender = null,
      address = null,
      idCardNumber = null,
      dateOfBirth = null,
      roleName,
    } = payload;

    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.phoneNumber = phoneNumber;
    this.profilePhotoUrl = profilePhotoUrl;
    this.isEmailVerified = isEmailVerified;
    this.gender = gender;
    this.address = address;
    this.idCardNumber = idCardNumber;
    this.dateOfBirth = dateOfBirth;
    this.roleName = roleName;
  }

  _verifyPayload({ name, email, password, roleName }) {
    if (!name || !email || !roleName || !password) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof roleName !== 'string' ||
      typeof password !== 'string'
    ) {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisterUser;
