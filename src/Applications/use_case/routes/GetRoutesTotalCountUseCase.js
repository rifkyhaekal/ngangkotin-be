class GetRoutesTotalCountUseCase {
  constructor({ routeRepository }) {
    this._routeRepository = routeRepository;
  }

  async execute() {
    const count = await this._routeRepository.getRoutesTotalCount();

    return count;
  }
}

module.exports = GetRoutesTotalCountUseCase;
