/* istanbul ignore file */
const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_SERVER,
});
const pool = require('./persistences/postgres/pool');

// service (repository, helper, manager, etc)
const UserRepository = require('../Domains/users/UserRepository');
const UserRepositoryPostgres = require('./repositories/UserRepositoryPostgres');
const PasswordHash = require('../Applications/security/PasswordHash');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');
const RouteRepository = require('../Domains/routes/RouteRepository');
const RouteRepositoryPostgres = require('./repositories/RouteRepositoryPostgres');
const VehicleTypeRepository = require('../Domains/vehicle_types/VehicleTypeRepository');
const VehicleTypeRepositoryPostgres = require('./repositories/VehicleTypeRepositoryPostgres');
const VehicleRepository = require('../Domains/vehicles/VehicleRepository');
const VehicleRepositoryPostgres = require('./repositories/VehicleRepositoryPostgres');
const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const AuthenticationRepositoryPostgres = require('./repositories/AuthenticationRepositoryPostgres');
const AngkotOrderRepository = require('../Domains/angkot_orders/AngkotOrderRepository');
const AngkotOrderRepositoryPostgres = require('./repositories/AngkotOrderRepositoryPostgres');
const JwtTokenManager = require('./security/JwtTokenManager');
const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const RedisCacheService = require('./caches/redis/RedisCacheService');
const CacheService = require('../Applications/cache/CacheService');

// validator
const UserValidator = require('../Applications/validator/UserValidator');
const JoiUserValidator = require('./validators/joi/JoiUserValidator');
const UsersValidator = require('./validators/joi/users');
const VehicleTypeValidator = require('../Applications/validator/VehicleTypeValidator');
const JoiVehicleTypeValidator = require('./validators/joi/JoiVehicleTypeValidator');
const VehicleTypesValidator = require('./validators/joi/vehicle_types');
const VehicleValidator = require('../Applications/validator/VehicleValidator');
const JoiVehicleValidator = require('./validators/joi/JoiVehicleValidator');
const VehiclesValidator = require('./validators/joi/vehicles');
const AngkotOrderValidator = require('../Applications/validator/AngkotOrderValidator');
const JoiAngkotOrderValidator = require('./validators/joi/JoiAngkotOrderValidator');
const AngkotOrdersValidator = require('./validators/joi/angkot_orders');
const PaginationValidator = require('../Applications/validator/PaginationValidator');
const JoiPaginationValidator = require('./validators/joi/JoiPaginationValidator');
const PaginationRequestValidator = require('./validators/joi/pagination');

// route use cases
const DeleteRouteUseCase = require('../Applications/use_case/routes/DeleteRouteUseCase');
const DeleteRoutesUseCase = require('../Applications/use_case/routes/DeleteRoutesUseCase');
const GetRoutesUseCase = require('../Applications/use_case/routes/GetRoutesUseCase');
const GetRoutesListUseCase = require('../Applications/use_case/routes/GetRoutesListUseCase');
const GetRouteUseCase = require('../Applications/use_case/routes/GetRouteUseCase');
const GetRoutesTotalCountUseCase = require('../Applications/use_case/routes/GetRoutesTotalCountUseCase');

// user use cases
const AddUserUseCase = require('../Applications/use_case/users/AddUserUseCase');
const UpdateUserUseCase = require('../Applications/use_case/users/UpdateUserUseCase');
const DeleteUserUseCase = require('../Applications/use_case/users/DeleteUserUseCase');
const DeleteUsersUseCase = require('../Applications/use_case/users/DeleteUsersUseCase');
const GetUsersByRoleNameUseCase = require('../Applications/use_case/users/GetUsersByRoleNameUseCase');
const GetUsersListByRoleNameUseCase = require('../Applications/use_case/users/GetUsersListByRoleNameUseCase');
const GetUserUseCase = require('../Applications/use_case/users/GetUserUseCase');
const GetUsersTotalCountByRoleNameUseCase = require('../Applications/use_case/users/GetUsersTotalCountByRoleNameUseCase');

// authentication use cases
const LoginUserUseCase = require('../Applications/use_case/authentications/LoginUserUseCase');
const LogoutUserUseCase = require('../Applications/use_case/authentications/LogoutUserUseCase');
const RefreshAuthenticationUseCase = require('../Applications/use_case/authentications/RefreshAuthenticationUseCase');

// vehicle type use cases
const AddVehicleTypeUseCase = require('../Applications/use_case/vehicle_types/AddVehicleTypeUseCase');
const UpdateVehicleTypeUseCase = require('../Applications/use_case/vehicle_types/UpdateVehicleTypeUseCase');
const DeleteVehicleTypeUseCase = require('../Applications/use_case/vehicle_types/DeleteVehicleTypeUseCase');
const DeleteVehicleTypesUseCase = require('../Applications/use_case/vehicle_types/DeleteVehicleTypesUseCase');
const GetVehicleTypesUseCase = require('../Applications/use_case/vehicle_types/GetVehicleTypesUseCase');
const GetVehicleTypesListUseCase = require('../Applications/use_case/vehicle_types/GetVehicleTypesListUseCase');
const GetVehicleTypeUseCase = require('../Applications/use_case/vehicle_types/GetVehicleTypeUseCase');

// vehicle use cases
const AddVehicleUseCase = require('../Applications/use_case/vehicles/AddVehicleUseCase');
const UpdateVehicleUseCase = require('../Applications/use_case/vehicles/UpdateVehicleUseCase');
const DeleteVehicleUseCase = require('../Applications/use_case/vehicles/DeleteVehicleUseCase');
const DeleteVehiclesUseCase = require('../Applications/use_case/vehicles/DeleteVehiclesUseCase');
const GetVehiclesUseCase = require('../Applications/use_case/vehicles/GetVehiclesUseCase');
const GetVehiclesListUseCase = require('../Applications/use_case/vehicles/GetVehiclesListUseCase');
const GetVehicleUseCase = require('../Applications/use_case/vehicles/GetVehicleUseCase');
const GetVehicleTotalCountUseCase = require('../Applications/use_case/vehicles/GetVehicleTotalCountUseCase');

// angkotorder use cases
const CreateAngkotOrderUseCase = require('../Applications/use_case/angkot_orders/CreateAngkotOrderUseCase');
const UpdateAngkotOrderStatusToOnRideUseCase = require('../Applications/use_case/angkot_orders/UpdateAngkotOrderStatusToOnRideUseCase');
const UpdateAngkotOrderStatusToCompleteUseCase = require('../Applications/use_case/angkot_orders/UpdateAngkotOrderStatusToCompleteUseCase');
const GetAngkotOrdersUseCase = require('../Applications/use_case/angkot_orders/GetAngkotOrdersUseCase');
const GetAngkotOrdersByPassengerIdUseCase = require('../Applications/use_case/angkot_orders/GetAngkotOrdersByPassengerIdUseCase');
const GetAngkotOrdersByDriverIdUseCase = require('../Applications/use_case/angkot_orders/GetAngkotOrdersByDriverIdUseCase');
const GetAngkotOrderUseCase = require('../Applications/use_case/angkot_orders/GetAngkotOrderUseCase');
const GetAngkotOrderTotalCountUseCase = require('../Applications/use_case/angkot_orders/GetAngkotOrderTotalCountUseCase');

// location use cases
const SetLocationUseCase = require('../Applications/use_case/locations/SetLocationUseCase');
const GetLocationUseCase = require('../Applications/use_case/locations/GetLocationUseCase');
const DeleteLocationUseCase = require('../Applications/use_case/locations/DeleteLocationUseCase');

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt.token,
        },
      ],
    },
  },
  {
    key: RouteRepository.name,
    Class: RouteRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
      ],
    },
  },
  {
    key: VehicleTypeRepository.name,
    Class: VehicleTypeRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: VehicleRepository.name,
    Class: VehicleRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: AngkotOrderRepository.name,
    Class: AngkotOrderRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PaginationValidator.name,
    Class: JoiPaginationValidator,
    parameter: {
      dependencies: [
        {
          concrete: PaginationRequestValidator,
        },
      ],
    },
  },
  {
    key: UserValidator.name,
    Class: JoiUserValidator,
    parameter: {
      dependencies: [
        {
          concrete: UsersValidator,
        },
      ],
    },
  },
  {
    key: VehicleTypeValidator.name,
    Class: JoiVehicleTypeValidator,
    parameter: {
      dependencies: [
        {
          concrete: VehicleTypesValidator,
        },
      ],
    },
  },
  {
    key: VehicleValidator.name,
    Class: JoiVehicleValidator,
    parameter: {
      dependencies: [
        {
          concrete: VehiclesValidator,
        },
      ],
    },
  },
  {
    key: AngkotOrderValidator.name,
    Class: JoiAngkotOrderValidator,
    parameter: {
      dependencies: [
        {
          concrete: AngkotOrdersValidator,
        },
      ],
    },
  },
  {
    key: CacheService.name,
    Class: RedisCacheService,
    parameter: {
      dependencies: [
        {
          concrete: redis,
        },
      ],
    },
  },
]);

// registering user use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'userValidator',
          internal: UserValidator.name,
        },
      ],
    },
  },
  {
    key: UpdateUserUseCase.name,
    Class: UpdateUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'userValidator',
          internal: UserValidator.name,
        },
      ],
    },
  },
  {
    key: DeleteUserUseCase.name,
    Class: DeleteUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteUsersUseCase.name,
    Class: DeleteUsersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: GetUsersByRoleNameUseCase.name,
    Class: GetUsersByRoleNameUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'paginationValidator',
          internal: PaginationValidator.name,
        },
      ],
    },
  },
  {
    key: GetUsersListByRoleNameUseCase.name,
    Class: GetUsersListByRoleNameUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: GetUserUseCase.name,
    Class: GetUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
  {
    key: GetUsersTotalCountByRoleNameUseCase.name,
    Class: GetUsersTotalCountByRoleNameUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
      ],
    },
  },
]);

// registering authentication use cases
container.register([
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
]);

// registering route use cases
container.register([
  {
    key: DeleteRouteUseCase.name,
    Class: DeleteRouteUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'routeRepository',
          internal: RouteRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteRoutesUseCase.name,
    Class: DeleteRoutesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'routeRepository',
          internal: RouteRepository.name,
        },
      ],
    },
  },
  {
    key: GetRoutesUseCase.name,
    Class: GetRoutesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'routeRepository',
          internal: RouteRepository.name,
        },
        {
          name: 'paginationValidator',
          internal: PaginationValidator.name,
        },
      ],
    },
  },
  {
    key: GetRoutesListUseCase.name,
    Class: GetRoutesListUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'routeRepository',
          internal: RouteRepository.name,
        },
      ],
    },
  },
  {
    key: GetRouteUseCase.name,
    Class: GetRouteUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'routeRepository',
          internal: RouteRepository.name,
        },
      ],
    },
  },
  {
    key: GetRoutesTotalCountUseCase.name,
    Class: GetRoutesTotalCountUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'routeRepository',
          internal: RouteRepository.name,
        },
      ],
    },
  },
]);

// registering vehicle type use cases
container.register([
  {
    key: AddVehicleTypeUseCase.name,
    Class: AddVehicleTypeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleTypeRepository',
          internal: VehicleTypeRepository.name,
        },
        {
          name: 'vehicleTypeValidator',
          internal: VehicleTypeValidator.name,
        },
      ],
    },
  },
  {
    key: UpdateVehicleTypeUseCase.name,
    Class: UpdateVehicleTypeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleTypeRepository',
          internal: VehicleTypeRepository.name,
        },
        {
          name: 'vehicleTypeValidator',
          internal: VehicleTypeValidator.name,
        },
      ],
    },
  },
  {
    key: DeleteVehicleTypeUseCase.name,
    Class: DeleteVehicleTypeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleTypeRepository',
          internal: VehicleTypeRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteVehicleTypesUseCase.name,
    Class: DeleteVehicleTypesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleTypeRepository',
          internal: VehicleTypeRepository.name,
        },
      ],
    },
  },
  {
    key: GetVehicleTypesUseCase.name,
    Class: GetVehicleTypesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleTypeRepository',
          internal: VehicleTypeRepository.name,
        },
        {
          name: 'paginationValidator',
          internal: PaginationValidator.name,
        },
      ],
    },
  },
  {
    key: GetVehicleTypesListUseCase.name,
    Class: GetVehicleTypesListUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleTypeRepository',
          internal: VehicleTypeRepository.name,
        },
      ],
    },
  },
  {
    key: GetVehicleTypeUseCase.name,
    Class: GetVehicleTypeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleTypeRepository',
          internal: VehicleTypeRepository.name,
        },
      ],
    },
  },
]);

// registering vehicle use cases
container.register([
  {
    key: AddVehicleUseCase.name,
    Class: AddVehicleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
        {
          name: 'vehicleValidator',
          internal: VehicleValidator.name,
        },
      ],
    },
  },
  {
    key: UpdateVehicleUseCase.name,
    Class: UpdateVehicleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
        {
          name: 'vehicleValidator',
          internal: VehicleValidator.name,
        },
      ],
    },
  },
  {
    key: DeleteVehicleUseCase.name,
    Class: DeleteVehicleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteVehiclesUseCase.name,
    Class: DeleteVehiclesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
      ],
    },
  },
  {
    key: GetVehiclesUseCase.name,
    Class: GetVehiclesUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
        {
          name: 'paginationValidator',
          internal: PaginationValidator.name,
        },
      ],
    },
  },
  {
    key: GetVehiclesListUseCase.name,
    Class: GetVehiclesListUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
      ],
    },
  },
  {
    key: GetVehicleUseCase.name,
    Class: GetVehicleUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
      ],
    },
  },
  {
    key: GetVehicleTotalCountUseCase.name,
    Class: GetVehicleTotalCountUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
      ],
    },
  },
]);

// registering angkotorder use cases
container.register([
  {
    key: CreateAngkotOrderUseCase.name,
    Class: CreateAngkotOrderUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
        {
          name: 'angkotOrderValidator',
          internal: AngkotOrderValidator.name,
        },
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
        {
          name: 'cacheService',
          internal: CacheService.name,
        },
      ],
    },
  },
  {
    key: UpdateAngkotOrderStatusToOnRideUseCase.name,
    Class: UpdateAngkotOrderStatusToOnRideUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
        {
          name: 'angkotOrderValidator',
          internal: AngkotOrderValidator.name,
        },
      ],
    },
  },
  {
    key: UpdateAngkotOrderStatusToCompleteUseCase.name,
    Class: UpdateAngkotOrderStatusToCompleteUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
        {
          name: 'angkotOrderValidator',
          internal: AngkotOrderValidator.name,
        },
        {
          name: 'vehicleRepository',
          internal: VehicleRepository.name,
        },
      ],
    },
  },
  {
    key: GetAngkotOrdersUseCase.name,
    Class: GetAngkotOrdersUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
        {
          name: 'paginationValidator',
          internal: PaginationValidator.name,
        },
      ],
    },
  },
  {
    key: GetAngkotOrdersByPassengerIdUseCase.name,
    Class: GetAngkotOrdersByPassengerIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
      ],
    },
  },
  {
    key: GetAngkotOrdersByDriverIdUseCase.name,
    Class: GetAngkotOrdersByDriverIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
      ],
    },
  },
  {
    key: GetAngkotOrderUseCase.name,
    Class: GetAngkotOrderUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
      ],
    },
  },
  {
    key: GetAngkotOrderTotalCountUseCase.name,
    Class: GetAngkotOrderTotalCountUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'angkotOrderRepository',
          internal: AngkotOrderRepository.name,
        },
      ],
    },
  },
]);

container.register([
  {
    key: SetLocationUseCase.name,
    Class: SetLocationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cacheService',
          internal: CacheService.name,
        },
      ],
    },
  },
  {
    key: DeleteLocationUseCase.name,
    Class: DeleteLocationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cacheService',
          internal: CacheService.name,
        },
      ],
    },
  },
  {
    key: GetLocationUseCase.name,
    Class: GetLocationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'cacheService',
          internal: CacheService.name,
        },
      ],
    },
  },
]);

module.exports = container;
