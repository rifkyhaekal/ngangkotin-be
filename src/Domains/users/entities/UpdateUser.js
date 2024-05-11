class UpdateUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      name,
      email,
      phoneNumber = null,
      profilePhotoUrl = null,
      isEmailVerified = false,
      gender = null,
      address = null,
      idCardNumber = null,
      dateOfBirth = null,
    } = payload;

    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.profilePhotoUrl = profilePhotoUrl;
    this.isEmailVerified = isEmailVerified;
    this.gender = gender;
    this.address = address;
    this.idCardNumber = idCardNumber;
    this.dateOfBirth = dateOfBirth;
  }

  _verifyPayload({ id, name, email }) {
    if (!id || !name || !email) {
      throw new Error('UPDATE_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof email !== 'string'
    ) {
      throw new Error('UPDATE_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UpdateUser;
