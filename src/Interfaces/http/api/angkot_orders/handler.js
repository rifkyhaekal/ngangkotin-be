const autoBind = require('auto-bind');
const MismatchError = require('../../../../Common/exceptions/MismatchError');
const CreateAngkotOrderUseCase = require('../../../../Applications/use_case/angkot_orders/CreateAngkotOrderUseCase');
const UpdateAngkotOrderStatusToOnRideUseCase = require('../../../../Applications/use_case/angkot_orders/UpdateAngkotOrderStatusToOnRideUseCase');
const UpdateAngkotOrderStatusToCompleteUseCase = require('../../../../Applications/use_case/angkot_orders/UpdateAngkotOrderStatusToCompleteUseCase');
const GetAngkotOrdersUseCase = require('../../../../Applications/use_case/angkot_orders/GetAngkotOrdersUseCase');
const GetAngkotOrdersByPassengerIdUseCase = require('../../../../Applications/use_case/angkot_orders/GetAngkotOrdersByPassengerIdUseCase');
const GetAngkotOrdersByDriverIdUseCase = require('../../../../Applications/use_case/angkot_orders/GetAngkotOrdersByDriverIdUseCase');
const GetAngkotOrderUseCase = require('../../../../Applications/use_case/angkot_orders/GetAngkotOrderUseCase');
const GetAngkotOrderTotalCountUseCase = require('../../../../Applications/use_case/angkot_orders/GetAngkotOrderTotalCountUseCase');
const AngkotOrderState = require('../../../../Common/enums/angkotOrderStatus');

class AngkotOrdersHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async createAngkotOrderHandler({ payload, server }, h) {
    const createAngkotOrderUseCase = this._container.getInstance(
      CreateAngkotOrderUseCase.name
    );

    const result = await createAngkotOrderUseCase.execute(payload);

    const orderData = {
      id: result.id,
      price: result.price,
      distance: result.distance,
      passengerId: result.passengerId,
      passengerName: result.passengerName,
      destinationName: result.destinationName,
      destinationCoordinate: result.destinationCoordinate,
      pickupLocationName: result.pickupLocationName,
      pickupLocationCoordinate: result.pickupLocationCoordinate,
    };

    server.publish(`/angkotOrders/driver/${result.driverId}`, orderData);

    const response = h.response({
      angkotOrderId: result.id,
    });

    response.code(201);
    return response;
  }

  async updateAngkotOrderStatusToOnRideHandler({ params, server }, h) {
    const { id } = params;

    const updateAngkotOrderStatusToOnRideUseCase = this._container.getInstance(
      UpdateAngkotOrderStatusToOnRideUseCase.name
    );

    await updateAngkotOrderStatusToOnRideUseCase.execute({ id });

    server.publish(`/angkotOrders/${id}/status`, {
      angkotOrderId: id,
      status: AngkotOrderState.RIDE,
    });

    return h.response({
      success: true,
    });
  }

  async updateAngkotOrderStatusToCompleteHandler({ params, server }, h) {
    const { id } = params;

    const updateAngkotOrderStatusToCompleteUseCase =
      this._container.getInstance(
        UpdateAngkotOrderStatusToCompleteUseCase.name
      );

    await updateAngkotOrderStatusToCompleteUseCase.execute({ id });

    server.publish(`/angkotOrders/${id}/status`, {
      angkotOrderId: id,
      status: AngkotOrderState.COMPLETE,
    });

    return h.response({
      success: true,
    });
  }

  async getAngkotOrdersHandler({ query }) {
    const getAngkotOrdersUseCase = this._container.getInstance(
      GetAngkotOrdersUseCase.name
    );
    const paginatedListResponse = await getAngkotOrdersUseCase.execute(query);

    return {
      items: paginatedListResponse.items,
      totalCount: paginatedListResponse.totalCount,
    };
  }

  async getAngkotOrdersByPassengerIdHandler({ query, params }) {
    const getAngkotOrdersByPassengerIdUseCase = this._container.getInstance(
      GetAngkotOrdersByPassengerIdUseCase.name
    );
    const paginatedMobileListResponse =
      await getAngkotOrdersByPassengerIdUseCase.execute(query, params);

    return paginatedMobileListResponse;
  }

  async getAngkotOrdersByDriverIdHandler({ query, params }) {
    const getAngkotOrdersByDriverIdUseCase = this._container.getInstance(
      GetAngkotOrdersByDriverIdUseCase.name
    );
    const paginatedMobileListResponse =
      await getAngkotOrdersByDriverIdUseCase.execute(query, params);

    return paginatedMobileListResponse;
  }

  async getAngkotOrderByIdHandler({ params }) {
    const { id } = params;

    const getAngkotOrderUseCase = await this._container.getInstance(
      GetAngkotOrderUseCase.name
    );

    const angkotOrder = await getAngkotOrderUseCase.execute(id);

    return {
      ...angkotOrder,
    };
  }

  async getAngkotOrderStatusByIdHandler() {
    return null;
  }

  async getAngkotOrderByDriverIdHandler() {
    return null;
  }

  async getAngkotOrdersCountHandler() {
    const getAngkotOrderTotalCount = await this._container.getInstance(
      GetAngkotOrderTotalCountUseCase.name
    );

    const count = await getAngkotOrderTotalCount.execute();

    return {
      angkotOrdersCount: count,
    };
  }
}

module.exports = AngkotOrdersHandler;
