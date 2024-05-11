const autoBind = require('auto-bind');
const MismatchError = require('../../../../Common/exceptions/MismatchError');
const AddVehicleUseCase = require('../../../../Applications/use_case/vehicles/AddVehicleUseCase');
const UpdateVehicleUseCase = require('../../../../Applications/use_case/vehicles/UpdateVehicleUseCase');
const DeleteVehicleUseCase = require('../../../../Applications/use_case/vehicles/DeleteVehicleUseCase');
const DeleteVehiclesUseCase = require('../../../../Applications/use_case/vehicles/DeleteVehiclesUseCase');
const GetVehiclesUseCase = require('../../../../Applications/use_case/vehicles/GetVehiclesUseCase');
const GetVehiclesListUseCase = require('../../../../Applications/use_case/vehicles/GetVehiclesListUseCase');
const GetVehicleUseCase = require('../../../../Applications/use_case/vehicles/GetVehicleUseCase');
const GetVehicleTotalCountUseCase = require('../../../../Applications/use_case/vehicles/GetVehicleTotalCountUseCase');

class VehiclesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async addVehicleHandler({ payload }, h) {
    const addVehicleUseCase = this._container.getInstance(
      AddVehicleUseCase.name
    );

    const result = await addVehicleUseCase.execute(payload);

    const response = h.response({
      vehicleId: result.id,
    });

    response.code(201);
    return response;
  }

  async updateVehicleHandler({ payload, params }, h) {
    const { id } = params;

    if (id !== payload.id) {
      throw new MismatchError('Id pada path tidak sama dengan di payload');
    }

    const updateVehicleUseCase = this._container.getInstance(
      UpdateVehicleUseCase.name
    );

    await updateVehicleUseCase.execute(payload);

    return h.response().code(204).takeover();
  }

  async deleteVehicleHandler({ params }, h) {
    const { id } = params;

    const deleteVehicleUseCase = this._container.getInstance(
      DeleteVehicleUseCase.name
    );

    await deleteVehicleUseCase.execute(id);

    return h.response().code(204).takeover();
  }

  async deleteVehiclesHandler({ payload }, h) {
    const deleteVehiclesUseCase = this._container.getInstance(
      DeleteVehiclesUseCase.name
    );

    const vehiclesDeleted = await deleteVehiclesUseCase.execute(payload.ids);

    const response = h.response({
      angkotsDeleted: vehiclesDeleted,
    });

    response.code(200);
    return response;
  }

  async getVehiclesHandler({ query }) {
    const getVehiclesUseCase = this._container.getInstance(
      GetVehiclesUseCase.name
    );
    const paginatedListResponse = await getVehiclesUseCase.execute(query);

    return {
      items: paginatedListResponse.items,
      totalCount: paginatedListResponse.totalCount,
    };
  }

  async getVehiclesListHandler() {
    const getVehiclesListUseCase = await this._container.getInstance(
      GetVehiclesListUseCase.name
    );

    const vehicleList = await getVehiclesListUseCase.execute();

    return {
      ...vehicleList,
    };
  }

  async getVehicleByIdHandler(request, h) {
    const { id } = request.params;

    const getVehicleUseCase = await this._container.getInstance(
      GetVehicleUseCase.name
    );

    const vehicle = await getVehicleUseCase.execute(id);

    const lastModified =
      vehicle.modifiedAt !== null ? vehicle.modifiedAt : vehicle.createdAt;

    if (request.headers['if-none-match'] == lastModified) {
      return h.response().code(304);
    }

    const response = h
      .response({
        ...vehicle,
      })
      .etag(lastModified);

    return response;
  }

  async getVehiclesCountHandler() {
    const getVehicleTotalCount = await this._container.getInstance(
      GetVehicleTotalCountUseCase.name
    );

    const count = await getVehicleTotalCount.execute();

    return {
      vehiclesCount: count,
    };
  }
}

module.exports = VehiclesHandler;
