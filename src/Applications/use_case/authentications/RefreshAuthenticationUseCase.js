class RefreshAuthenticationUseCase {
  constructor({ authenticationRepository, authenticationTokenManager }) {
    this._authenticationRepository = authenticationRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(refreshToken, type) {
    this._verifyPayload(refreshToken);

    if (type === 'web') {
      await this._authenticationTokenManager.verifyRefreshTokenWeb(
        refreshToken
      );
      await this._authenticationRepository.checkAvailabilityToken(refreshToken);

      const { id, name, email, profilePhotoUrl, roles } =
        await this._authenticationTokenManager.decodePayload(refreshToken);

      return this._authenticationTokenManager.createAccessTokenWeb({
        id,
        name,
        email,
        profilePhotoUrl,
        roles,
      });
    }

    if (type === 'mobile') {
      await this._authenticationTokenManager.verifyRefreshTokenMobile(
        refreshToken
      );
      await this._authenticationRepository.checkAvailabilityToken(refreshToken);

      const { id, name, email, profilePhotoUrl, roles } =
        await this._authenticationTokenManager.decodePayload(refreshToken);

      return this._authenticationTokenManager.createAccessTokenWeb({
        id,
        name,
        email,
        profilePhotoUrl,
        roles,
      });
    }

    return '';
  }

  _verifyPayload(refreshToken) {
    if (!refreshToken) {
      throw new Error(
        'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN'
      );
    }

    if (typeof refreshToken !== 'string') {
      throw new Error(
        'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION'
      );
    }
  }
}

module.exports = RefreshAuthenticationUseCase;
