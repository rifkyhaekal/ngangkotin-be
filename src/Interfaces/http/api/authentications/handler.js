const autoBind = require('auto-bind');
const LoginUserUseCase = require('../../../../Applications/use_case/authentications/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/authentications/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../../../../Applications/use_case/authentications/LogoutUserUseCase');
const AuthenticationError = require('../../../../Common/exceptions/AuthenticationError');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);

    const deviceType = request.headers['x-device-type'];

    if (deviceType === 'web') {
      const { accessToken, refreshToken } = await loginUserUseCase.execute(
        request.payload,
        'web'
      );

      const response = h.response({
        accessToken,
      });

      response.state('jwt', refreshToken, {
        isHttpOnly: true,
        ttl: 2 * 24 * 60 * 60 * 1000,
        isSameSite: 'None',
        isSecure: true,
        path: '/',
      });

      response.code(201);
      return response;
    }

    if (deviceType === 'mobile') {
      const { accessToken, refreshToken } = await loginUserUseCase.execute(
        request.payload,
        'mobile'
      );

      const response = h.response({
        accessToken,
        refreshToken,
      });

      response.code(201);
      return response;
    }

    return h.response({ message: 'Invalid' }).code(400);
  }

  async reAuthenticationHandler(request, h) {
    const deviceType = request.headers['x-device-type'];

    if (deviceType === 'web') {
      const cookies = request.state;

      if (!cookies?.jwt) {
        throw new AuthenticationError('Kredensial tidak valid!');
      }

      const refreshToken = cookies.jwt;

      const refreshAuthenticationUseCase = this._container.getInstance(
        RefreshAuthenticationUseCase.name
      );
      const accessToken = await refreshAuthenticationUseCase.execute(
        refreshToken,
        'web'
      );

      if (accessToken.length === 0) {
        return h.response({ message: 'Invalid' }).code(400);
      }

      return {
        accessToken,
      };
    }

    if (deviceType === 'mobile') {
      const { refreshToken } = request.payload;
      const refreshAuthenticationUseCase = this._container.getInstance(
        RefreshAuthenticationUseCase.name
      );
      const accessToken = await refreshAuthenticationUseCase.execute(
        refreshToken,
        'mobile'
      );

      if (accessToken.length === 0) {
        return h.response({ message: 'Invalid' }).code(400);
      }

      return {
        accessToken,
      };
    }

    return h.response({ message: 'Invalid' }).code(400);
  }

  async deleteAuthenticationHandler(request, h) {
    const deviceType = request.headers['x-device-type'];

    if (deviceType === 'web') {
      const cookies = request.state;

      if (!cookies?.jwt) {
        throw new AuthenticationError('Gagal logout!');
      }

      const refreshToken = cookies.jwt;

      const logoutUserUseCase = this._container.getInstance(
        LogoutUserUseCase.name
      );
      await logoutUserUseCase.execute(refreshToken);

      return h
        .response()
        .unstate('jwt', {
          path: '/',
          isSecure: true,
          isHttpOnly: true,
          isSameSite: 'None',
          ttl: null,
        })
        .code(204)
        .takeover();
    }

    if (deviceType === 'mobile') {
      const { refreshToken } = params;

      const logoutUserUseCase = this._container.getInstance(
        LogoutUserUseCase.name
      );
      await logoutUserUseCase.execute(refreshToken);

      return h.response({
        message: 'Logout success',
      });
    }

    return h.response({ message: 'Invalid' }).code(400);
  }
}

module.exports = AuthenticationsHandler;
