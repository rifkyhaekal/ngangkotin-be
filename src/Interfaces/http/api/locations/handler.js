const autoBind = require('auto-bind');
const SetLocationUseCase = require('../../../../Applications/use_case/locations/SetLocationUseCase');
const DeleteLocationUseCase = require('../../../../Applications/use_case/locations/DeleteLocationUseCase');
const GetLocationUseCase = require('../../../../Applications/use_case/locations/GetLocationUseCase');

class LocationsHandler {
  constructor(container) {
    this._container = container;

    autoBind(this);
  }

  async setLocationHandler({ payload, server }, h) {
    const setLocationUseCase = this._container.getInstance(
      SetLocationUseCase.name
    );

    await setLocationUseCase.execute(payload);

    server.publish(`/locations/${payload.id}`, payload);

    return h.response().code(201).takeover();
  }

  async deleteLocationHandler({ params }, h) {
    const { id } = params;

    const deleteLocationUseCase = this._container.getInstance(
      DeleteLocationUseCase.name
    );

    await deleteLocationUseCase.execute(id);

    return h.response().code(204).takeover();
  }

  async getLocationByIdHandler({ params }) {
    const { id } = params;

    const getLocationUseCase = await this._container.getInstance(
      GetLocationUseCase.name
    );

    const location = await getLocationUseCase.execute(id);

    return {
      ...location,
    };
  }
}

module.exports = LocationsHandler;
