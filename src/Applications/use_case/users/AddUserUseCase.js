const AlreadyExistsError = require('../../../Common/exceptions/AlreadyExistsError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');

class AddUserUseCase {
  constructor({ userRepository, passwordHash, userValidator }) {
    this._userRepository = userRepository;
    this._passwordHash = passwordHash;
    this._userValidator = userValidator;
  }

  async execute(useCasePayload) {
    await this._userValidator.validateAddUserPayload(useCasePayload);

    const registerUser = new RegisterUser(useCasePayload);

    if (registerUser.phoneNumber !== null) {
      const isPhoneNumberExist =
        await this._userRepository.verifyAvailablePhoneNumber(
          registerUser.phoneNumber
        );

      if (isPhoneNumberExist) {
        throw new AlreadyExistsError('Phone Number is already registered!');
      }
    }

    if (registerUser.idCardNumber !== null) {
      const isIdCardNumberExist =
        await this._userRepository.verifyAvailableIdCardNumber(
          registerUser.idCardNumber
        );

      if (isIdCardNumberExist) {
        throw new AlreadyExistsError('Id Card Number is already registered!');
      }
    }

    const isEmailExist = await this._userRepository.verifyAvailableEmail(
      registerUser.email
    );

    if (isEmailExist) {
      throw new AlreadyExistsError('Email sudah terdaftar!');
    }

    registerUser.password = await this._passwordHash.hash(
      registerUser.password
    );

    return this._userRepository.addUser(registerUser);
  }
}

module.exports = AddUserUseCase;
