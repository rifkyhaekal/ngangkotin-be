const AuthenticationTokenManager = require('../../Applications/security/AuthenticationTokenManager');
const AuthenticationError = require('../../Common/exceptions/AuthenticationError');

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();

    this._jwt = jwt;
  }

  async createAccessTokenWeb(payload) {
    return this._jwt.generate(payload, {
      key: process.env.ACCESS_TOKEN_KEY,
      expiresIn: `${process.env.ACCESS_TOKEN_AGE}s`,
    });
  }

  async createRefreshTokenWeb(payload) {
    return this._jwt.generate(payload, {
      key: process.env.REFRESH_TOKEN_KEY,
      expiresIn: `${process.env.REFRESH_TOKEN_AGE}s`,
    });
  }

  async verifyRefreshTokenWeb(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verifySignature(artifacts, {
        key: process.env.REFRESH_TOKEN_KEY,
        expiresIn: `${process.env.REFRESH_TOKEN_AGE}s`,
      });
    } catch (error) {
      throw new AuthenticationError('Refresh token tidak valid');
    }
  }

  async createAccessTokenMobile(payload) {
    return this._jwt.generate(payload, {
      key: process.env.ACCESS_TOKEN_KEY,
      expiresIn: `${process.env.MOBILE_ACCESS_TOKEN_AGE}s`,
    });
  }

  async createRefreshTokenMobile(payload) {
    return this._jwt.generate(payload, {
      key: process.env.REFRESH_TOKEN_KEY,
      expiresIn: `${process.env.MOBILE_REFRESH_TOKEN_AGE}s`,
    });
  }

  async verifyRefreshTokenMobile(token) {
    try {
      const artifacts = this._jwt.decode(token);
      this._jwt.verifySignature(artifacts, {
        key: process.env.REFRESH_TOKEN_KEY,
        expiresIn: `${process.env.MOBILE_REFRESH_TOKEN_AGE}s`,
      });
    } catch (error) {
      throw new AuthenticationError('Refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    const artifacts = this._jwt.decode(token);
    return artifacts.decoded.payload;
  }
}

module.exports = JwtTokenManager;
