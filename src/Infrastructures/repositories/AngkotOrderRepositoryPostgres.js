const AngkotOrderRepository = require('../../Domains/angkot_orders/AngkotOrderRepository');
const InternalServerError = require('../../Common/exceptions/InternalServerError');
const NotFoundError = require('../../Common/exceptions/NotFoundError');
const {
  convertKeysToCamelCase,
} = require('../../Common/helpers/StringMapperHelper');
const { context } = require('../http/middlewares/userContext');

class AngkotOrderRepositoryPostgres extends AngkotOrderRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
    this._user = context.user;
  }

  async createAngkotOrder(createAngkotOrder) {
    const {
      passengerId,
      driverId,
      pickupCoordinate,
      pickupAddress,
      destinationCoordinate,
      destinationAddress,
      price,
      distance,
      status,
    } = createAngkotOrder;

    const id = this._idGenerator(21);
    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'INSERT INTO angkotorders(id, passenger_id, driver_id, pickup_coordinate, pickup_address, destination_coordinate, destination_address, price, distance, status, created_at, created_by, is_deleted) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id',
      values: [
        id,
        passengerId,
        driverId,
        pickupCoordinate,
        pickupAddress,
        destinationCoordinate,
        destinationAddress,
        price,
        distance,
        status,
        currentDate,
        currentUser,
        false,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InternalServerError(`Gagal menambahkan order angkot.`);
    }

    return result.rows[0].id;
  }

  async updateAngkotOrderStatusToOnRide(updateAngkotOrderStatus) {
    const { id, status } = updateAngkotOrderStatus;

    const isAngkotOrderExist = await this.verifyAngkotOrderIsExist(id);

    if (!isAngkotOrderExist) {
      throw new NotFoundError(
        `Order angkot dengan Id [${id}] tidak ditemukan.`
      );
    }

    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'UPDATE angkotorders SET status = $1, modified_at = $2, modified_by = $3 WHERE id = $4 RETURNING id',
      values: [status, currentDate, currentUser, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(`Gagal memperbaharui status angkot order.`);
    }
  }

  async updateAngkotOrderStatusToComplete(updateAngkotOrderStatus) {
    const { id, status } = updateAngkotOrderStatus;

    const isAngkotOrderExist = await this.verifyAngkotOrderIsExist(id);

    if (!isAngkotOrderExist) {
      throw new NotFoundError(
        `Order angkot dengan Id [${id}] tidak ditemukan.`
      );
    }

    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'UPDATE angkotorders SET status = $1, modified_at = $2, modified_by = $3 WHERE id = $4 RETURNING id',
      values: [status, currentDate, currentUser, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(`Gagal memperbaharui status angkot order.`);
    }
  }

  async getAngkotOrders(pageSize, skip, sort, sortBy, search) {
    const queryBuilder = `
      SELECT 
        id, 
        price,
        distance,
        pickup_address,
        destination_address,
        created_at
      FROM 
        angkotorders
      WHERE 
        is_deleted = FALSE
      AND 
        LOWER(id || price || distance || pickup_address || destination_address) ILIKE LOWER($1)
      ORDER BY ${sortBy === 'created_at' ? `created_at` : `${sortBy}`} ${sort}
      LIMIT $2 OFFSET $3 
    `;

    const query = {
      text: queryBuilder,
      values: [`%${search}%`, pageSize, skip],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getAngkotOrdersByPassengerId(skip, pageSize, passengerId) {
    const queryBuilder = `
    SELECT 
      id, 
      price,
      distance,
      pickup_address,
      destination_address,
      created_at
    FROM 
      angkotorders
    WHERE 
      is_deleted = FALSE
    AND
      passenger_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3 
  `;

    const query = {
      text: queryBuilder,
      values: [passengerId, pageSize, skip],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getAngkotOrdersByDriverId(skip, pageSize, driverId) {
    const queryBuilder = `
    SELECT 
      id, 
      price,
      distance,
      pickup_address,
      destination_address,
      created_at
    FROM 
      angkotorders
    WHERE 
      is_deleted = FALSE
    AND
      driver_id = $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3 
  `;

    const query = {
      text: queryBuilder,
      values: [driverId, pageSize, skip],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getAngkotOrder(id) {
    const query = {
      text: `
      SELECT 
        ao.id,
        ao.passenger_id,
        ao.driver_id,
        ps.name as passenger_name,
        dr.name as driver_name,
        ao.pickup_coordinate,
        ao.pickup_address,
        ao.destination_coordinate,
        ao.destination_address,
        ao.price, 
        ao.distance,
        ao.status,
        vs.registration_number,
        vs.total_passengers,
        vs.condition,
        vs.current_passengers, 
        vt.code,
        vt.color_name,
        vt.color_hex,
        rs.name as route_name,
        ao.created_at,
        ao.created_by,
        ao.is_deleted,
        ao.modified_at,
        ao.modified_by
      FROM 
        angkotorders AS ao 
      JOIN 
        users AS dr
      ON
        ao.driver_id = dr.id
      JOIN 
        users AS ps 
      ON 
        ao.passenger_id = ps.id 
      JOIN
        vehicles AS vs
      ON
        vs.user_id = dr.id
      JOIN
        vehicle_types AS vt
      ON
        vs.vehicle_type_id = vt.id
      JOIN
        routes AS rs
      ON
        vt.route_id = rs.id
      WHERE 
        ao.id = $1 
      AND 
        vs.is_deleted = FALSE`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows[0]);
  }

  async verifyAngkotOrderIsExist(id) {
    const query = {
      text: `SELECT EXISTS (SELECT 1 FROM angkotorders WHERE id = $1 AND is_deleted = FALSE)`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0].exists;
  }

  async getTotalCounts() {
    const query = {
      text: 'SELECT COUNT(*) FROM angkotorders WHERE is_deleted = FALSE',
    };

    const result = await this._pool.query(query);

    return Number(result.rows[0].count);
  }

  async getTotalCountsByPassengerId(passengerId) {
    const query = {
      text: 'SELECT COUNT(*) FROM angkotorders WHERE is_deleted = FALSE AND passenger_id = $1',
      values: [passengerId],
    };

    const result = await this._pool.query(query);

    return Number(result.rows[0].count);
  }

  async getTotalCountsByDriverId(driverId) {
    const query = {
      text: 'SELECT COUNT(*) FROM angkotorders WHERE is_deleted = FALSE AND driver_id = $1',
      values: [driverId],
    };

    const result = await this._pool.query(query);

    return Number(result.rows[0].count);
  }
}

module.exports = AngkotOrderRepositoryPostgres;
