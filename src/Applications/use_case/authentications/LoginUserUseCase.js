const UserLogin = require('../../../Domains/users/entities/UserLogin');
const NewAuthentication = require('../../../Domains/authentications/entities/NewAuth');
const AuthenticationError = require('../../../Common/exceptions/AuthenticationError');

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    authenticationTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload, type) {
    const { email, password, roleName } = new UserLogin(useCasePayload);

    const id = await this._userRepository.getIdByEmail(email);
    const user = await this._userRepository.getUserById(id);
    const { roles } = await this._userRepository.getUserRolesByUserId(id);

    if (!roles.includes(roleName)) {
      throw new AuthenticationError('Kredensial anda tidak valid.');
    }

    const encryptedPassword = await this._userRepository.getPasswordByEmail(
      email
    );

    await this._passwordHash.comparePassword(password, encryptedPassword);

    let accessToken = '';
    let refreshToken = '';

    if (type === 'web') {
      accessToken = await this._authenticationTokenManager.createAccessTokenWeb(
        {
          id,
          name: user.name,
          email: user.email,
          profilePhotoUrl: user.profilePhotoUrl,
          roles,
        }
      );

      refreshToken =
        await this._authenticationTokenManager.createRefreshTokenWeb({
          id,
          name: user.name,
          email: user.email,
          profilePhotoUrl: user.profilePhotoUrl,
          roles,
        });
    } else if (type === 'mobile') {
      accessToken =
        await this._authenticationTokenManager.createAccessTokenMobile({
          id,
          name: user.name,
          email: user.email,
          profilePhotoUrl: user.profilePhotoUrl,
          roles,
        });

      refreshToken =
        await this._authenticationTokenManager.createRefreshTokenMobile({
          id,
          name: user.name,
          email: user.email,
          profilePhotoUrl: user.profilePhotoUrl,
          roles,
        });
    }

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(
      newAuthentication.refreshToken
    );

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
