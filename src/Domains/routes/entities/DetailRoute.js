class DetailRoute {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      name,
      distance,
      description,
      coordinates,
      createdAt,
      createdBy,
      isDeleted,
      modifiedAt,
      modifiedBy,
    } = payload;

    this.id = id;
    this.name = name;
    this.distance = distance;
    this.description = description;
    this.coordinates = coordinates;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.isDeleted = isDeleted;
    this.modifiedAt = modifiedAt;
    this.modifiedBy = modifiedBy;
  }

  _verifyPayload({
    id,
    name,
    distance,
    description,
    coordinates,
    createdAt,
    createdBy,
  }) {
    if (
      !id ||
      !name ||
      !distance ||
      !description ||
      !coordinates ||
      !createdAt ||
      !createdBy
    ) {
      throw new Error('DETAIL_ROUTE.NOT_CONTAIN_NEDDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof name !== 'string' ||
      typeof distance !== 'number' ||
      typeof description !== 'string' ||
      typeof coordinates !== 'object' ||
      typeof createdAt !== 'string' ||
      typeof createdBy !== 'string'
    ) {
      throw new Error('DETAIL_ROUTE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DetailRoute;
