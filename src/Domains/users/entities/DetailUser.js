class DetailUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      name,
      email,
      phoneNumber,
      profilePhotoUrl,
      isEmailVerified,
      gender,
      address,
      idCardNumber,
      dateOfBirth,
      createdAt,
      createdBy,
      isDeleted,
      modifiedAt,
      modifiedBy,
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
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.isDeleted = isDeleted;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
  }

  _verifyPayload({ name, email, createdAt, createdBy }) {
    if (!name || !email || !createdAt || !createdBy) {
      throw new Error('DETAIL_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof createdBy !== 'string'
    ) {
      throw new Error('DETAIL_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailUser;
