// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Nes = require('@hapi/nes');
const Jwt = require('@hapi/jwt');
const rateLimit = require('hapi-rate-limit');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const routes = require('../../Interfaces/http/api/routes');
const vehicleTypes = require('../../Interfaces/http/api/vehicle_types');
const vehicles = require('../../Interfaces/http/api/vehicles');
const angkotOrders = require('../../Interfaces/http/api/angkot_orders');
const locations = require('../../Interfaces/http/api/locations');

// exceptions
const MismatchError = require('../../Common/exceptions/MismatchError');
const ValidationError = require('../../Common/exceptions/ValidationError');
const AuthorizationError = require('../../Common/exceptions/AuthorizationError');
const AuthenticationError = require('../../Common/exceptions/AuthenticationError');
const ArgumentError = require('../../Common/exceptions/ArgumentError');
const NotFoundError = require('../../Common/exceptions/NotFoundError');
const AlreadyExistsError = require('../../Common/exceptions/AlreadyExistsError');
const InvalidOperationError = require('../../Common/exceptions/InvalidOperationError');
const ProblemDetailsFor = require('../../Common/exceptions/ProblemDetailsFor');
const InternalServerError = require('../../Common/exceptions/InternalServerError');
const DomainErrorTranslator = require('../../Common/exceptions/DomainErrorTranslator');

// middlewares
const { createContext } = require('./middlewares/userContext');

const createServer = async (container) => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST || '',
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        preflightStatusCode: 200,
        additionalHeaders: ['X-Device-Type'],
      },
    },
  });

  server.realm.modifiers.route.prefix = '/v1';

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: rateLimit,
      options: {
        enabled: false,
      },
    },
    {
      plugin: Nes,
      options: {
        auth: false,
        heartbeat: {
          interval: 60 * 1000,
          timeout: 15 * 1000,
        },
      },
    },
  ]);

  server.auth.strategy('ngangkotin_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        name: artifacts.decoded.payload.name,
        email: artifacts.decoded.payload.email,
        photoProfileUrl: artifacts.decoded.payload.photoProfileUrl,
        roles: artifacts.decoded.payload.roles,
      },
    }),
  });

  server.auth.strategy('ngangkotin_jwt_mobile', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.MOBILE_ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        name: artifacts.decoded.payload.name,
        email: artifacts.decoded.payload.email,
        photoProfileUrl: artifacts.decoded.payload.photoProfileUrl,
        roles: artifacts.decoded.payload.roles,
      },
    }),
  });

  // server.auth.default('ngangkotin_jwt');

  await server.register([
    {
      plugin: users,
      options: {
        container,
      },
    },
    {
      plugin: authentications,
      options: {
        container,
      },
    },
    {
      plugin: routes,
      options: {
        container,
      },
    },
    {
      plugin: vehicleTypes,
      options: {
        container,
      },
    },
    {
      plugin: vehicles,
      options: {
        container,
      },
    },
    {
      plugin: angkotOrders,
      options: {
        container,
      },
    },
    {
      plugin: locations,
      options: {
        container,
      },
    },
  ]);

  server.subscription('/locations');
  server.subscription('/angkotOrders/driver/{id}');
  server.subscription('/locations/{id}');
  server.subscription('/angkotOrders/{id}/status');

  server.ext('onPreHandler', (request, h) => {
    createContext(request);
    return h.continue;
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      const translatedError = DomainErrorTranslator.translate(response);

      if (translatedError instanceof InvalidOperationError) {
        const newResponse = h.response({
          type: ProblemDetailsFor.InvalidOperationError.Type,
          title: ProblemDetailsFor.InvalidOperationError.Title,
          status: translatedError.statusCode,
          detail: translatedError.message,
        });

        newResponse.code(translatedError.statusCode);
        console.error(translatedError.message);
        return newResponse;
      }
    }

    if (response instanceof ValidationError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.ValidationError.Type,
        title: ProblemDetailsFor.ValidationError.Title,
        status: response.statusCode,
        errors: response.errors,
      });

      newResponse.code(response.statusCode);
      console.error(response.errors);
      return newResponse;
    }

    if (response instanceof MismatchError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.MismatchError.Type,
        title: ProblemDetailsFor.MismatchError.Title,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    if (response instanceof ArgumentError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.ArgumentError.Type,
        title: ProblemDetailsFor.ArgumentError.Title,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    if (response instanceof AuthenticationError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.UnauthorizedAccessError.Type,
        title: ProblemDetailsFor.UnauthorizedAccessError.Title,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    if (response instanceof AuthorizationError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.ForbiddenAccessError.Type,
        title: ProblemDetailsFor.ForbiddenAccessError.Title,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    if (response instanceof NotFoundError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.NotFoundError.Type,
        title: ProblemDetailsFor.NotFoundError.Title,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    if (response instanceof AlreadyExistsError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.AlreadyExistsError.Type,
        title: ProblemDetailsFor.AlreadyExistsError.Title,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    if (response instanceof InvalidOperationError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.InvalidOperationError.Type,
        title: ProblemDetailsFor.InvalidOperationError.Title,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    if (response instanceof InternalServerError) {
      const newResponse = h.response({
        type: ProblemDetailsFor.UnknownError.Type,
        title: ProblemDetailsFor.UnknownError.Type,
        status: response.statusCode,
        detail: response.message,
      });

      newResponse.code(response.statusCode);
      console.error(response.message);
      return newResponse;
    }

    console.error(`Error: ${response.message}`);
    return response.continue || response;
  });

  server.events.on('response', (request) => {
    console.log(
      `${request.info.remoteAddress} : ${request.method.toUpperCase()} ${
        request.path
      } --> ${request.response.statusCode}`
    );

    if (request.payload) {
      console.log('Request payload: ', request.payload);
    }

    if (request.query) {
      console.log('Request query:', request.query);
    }
    console.log('Response payload:', request.response.source);
  });

  return server;
};

module.exports = createServer;
