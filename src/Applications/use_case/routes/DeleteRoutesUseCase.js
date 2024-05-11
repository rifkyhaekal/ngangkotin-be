class DeleteRoutesUseCase {
  constructor({ routeRepository }) {
    this._routeRepository = routeRepository;
  }

  async execute(routeIds) {
    const result = await this._routeRepository.deleteRoutes(routeIds);

    return result;
  }
}

module.exports = DeleteRoutesUseCase;
