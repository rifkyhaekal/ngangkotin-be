const autoBind = require('auto-bind');
const NotFoundError = require('../../../../Common/exceptions/NotFoundError');
const MismatchError = require('../../../../Common/exceptions/MismatchError');
const AddVehicleTypeUseCase = require('../../../../Applications/use_case/vehicle_types/AddVehicleTypeUseCase');
const UpdateVehicleTypeUseCase = require('../../../../Applications/use_case/vehicle_types/UpdateVehicleTypeUseCase');
const DeleteVehicleTypeUseCase = require('../../../../Applications/use_case/vehicle_types/DeleteVehicleTypeUseCase');
const DeleteVehicleTypesUseCase = require('../../../../Applications/use_case/vehicle_types/DeleteVehicleTypesUseCase');
const GetVehicleTypesUseCase = require('../../../../Applications/use_case/vehicle_types/GetVehicleTypesUseCase');
const GetVehicleTypesListUseCase = require('../../../../Applications/use_case/vehicle_types/GetVehicleTypesListUseCase');
const GetVehicleTypeUseCase = require('../../../../Applications/use_case/vehicle_types/GetVehicleTypeUseCase');

class VehicleTypesHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async addVehicleTypeHandler({ payload }, h) {
    const addVehicleTypeUseCase = this._container.getInstance(
      AddVehicleTypeUseCase.name
    );

    const result = await addVehicleTypeUseCase.execute(payload);

    const response = h.response({
      vehicleTypeId: result.id,
    });

    response.code(201);
    return response;
  }

  async updateVehicleTypeHandler({ payload, params }, h) {
    const { id } = params;

    if (id !== payload.id) {
      throw new MismatchError('Id pada path tidak sama dengan di payload');
    }

    const updateVehicleTypeUseCase = this._container.getInstance(
      UpdateVehicleTypeUseCase.name
    );

    await updateVehicleTypeUseCase.execute(payload);
    return h.response().code(204).takeover();
  }

  async deleteVehicleTypeHandler({ params }, h) {
    const { id } = params;

    const deleteVehicleTypeUseCase = this._container.getInstance(
      DeleteVehicleTypeUseCase.name
    );

    await deleteVehicleTypeUseCase.execute(id);

    return h.response().code(204).takeover();
  }

  async deleteVehicleTypesHandler({ payload }, h) {
    const deleteVehicleTypesUseCase = this._container.getInstance(
      DeleteVehicleTypesUseCase.name
    );

    const vehicleTypesDeleted = await deleteVehicleTypesUseCase.execute(
      payload.ids
    );

    const response = h.response({
      angkotTypesDeleted: vehicleTypesDeleted,
    });

    response.code(200);
    return response;
  }

  async getVehicleTypesHandler({ query }) {
    const getVehicleTypesUseCase = this._container.getInstance(
      GetVehicleTypesUseCase.name
    );
    const paginatedListResponse = await getVehicleTypesUseCase.execute(query);

    return {
      items: paginatedListResponse.items,
      totalCount: paginatedListResponse.totalCount,
    };
  }

  async getVehicleTypesListHandler() {
    const getVehicleTypesListUseCase = await this._container.getInstance(
      GetVehicleTypesListUseCase.name
    );

    const vehicleTypeList = await getVehicleTypesListUseCase.execute();

    return {
      ...vehicleTypeList,
    };
  }

  async getVehicleTypeByIdHandler(request, h) {
    const { id } = request.params;

    const getVehicleTypeUseCase = await this._container.getInstance(
      GetVehicleTypeUseCase.name
    );

    const vehicleType = await getVehicleTypeUseCase.execute(id);

    if (!vehicleType) {
      throw new NotFoundError(
        `Tipe Angkot dengan id: [${id}] tidak ditemukan.`
      );
    }

    const lastModified =
      vehicleType.modifiedAt !== null
        ? vehicleType.modifiedAt
        : vehicleType.createdAt;

    if (request.headers['if-none-match'] == lastModified) {
      return h.response().code(304);
    }

    const response = h
      .response({
        ...vehicleType,
      })
      .etag(lastModified);

    return response;
  }
}

module.exports = VehicleTypesHandler;
