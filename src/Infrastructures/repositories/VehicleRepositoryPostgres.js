const VehicleRepository = require('../../Domains/vehicles/VehicleRepository');
const InternalServerError = require('../../Common/exceptions/InternalServerError');
const NotFoundError = require('../../Common/exceptions/NotFoundError');
const AlreadyExistsError = require('../../Common/exceptions/AlreadyExistsError');
const {
  convertKeysToCamelCase,
} = require('../../Common/helpers/StringMapperHelper');
const { context } = require('../http/middlewares/userContext');

class VehicleRepositoryPostgres extends VehicleRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
    this._user = context.user;
  }

  async addVehicle(addVehicle) {
    const {
      registrationNumber,
      totalPassengers,
      condition,
      brand,
      vehicleTypeId,
      driverId,
    } = addVehicle;

    const isRegistrationNumberExist = await this.getVehicleByRegistrationNumber(
      registrationNumber
    );

    if (isRegistrationNumberExist) {
      throw new AlreadyExistsError(
        `Nomor Kendaraan [${registrationNumber}] sudah terdaftar.`
      );
    }

    const id = this._idGenerator(21);
    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'INSERT INTO vehicles(id, registration_number, total_passengers, condition, brand, vehicle_type_id, user_id, created_at, created_by, is_deleted) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      values: [
        id,
        registrationNumber,
        totalPassengers,
        condition,
        brand,
        vehicleTypeId,
        driverId,
        currentDate,
        currentUser,
        false,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InternalServerError(`Gagal menambahkan angkot.`);
    }

    return result.rows[0].id;
  }

  async updateVehicle(updateVehicle) {
    const {
      id,
      registrationNumber,
      totalPassengers,
      condition,
      brand,
      vehicleTypeId,
      driverId,
    } = updateVehicle;

    const isVehicleExist = await this.verifyVehicleIsExist(id);

    if (!isVehicleExist) {
      throw new NotFoundError(`Angkot dengan Id [${id}] tidak ditemukan.`);
    }

    const isRegistrationNumberExist = await this.getVehicleByRegistrationNumber(
      registrationNumber,
      id
    );

    if (isRegistrationNumberExist) {
      throw new AlreadyExistsError(
        `Nomor Kendaraan [${registrationNumber}] sudah terdaftar.`
      );
    }

    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'UPDATE vehicles SET registration_number = $1, total_passengers = $2, condition = $3, brand = $4, vehicle_type_id = $5, user_id = $6, modified_at = $7, modified_by = $8 WHERE id = $9 RETURNING id',
      values: [
        registrationNumber,
        totalPassengers,
        condition,
        brand,
        vehicleTypeId,
        driverId,
        currentDate,
        currentUser,
        id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(`Gagal memperbaharui angkot.`);
    }
  }

  async updateVehicleCurrentPassengers(payload) {
    const { id, totalPassengers } = payload;

    const isVehicleExist = await this.verifyVehicleIsExist(id);

    if (!isVehicleExist) {
      throw new NotFoundError(`Angkot dengan Id [${id}] tidak ditemukan.`);
    }

    const query = {
      text: 'UPDATE vehicles SET current_passengers = $1 WHERE id = $2 RETURNING id',
      values: [totalPassengers, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(`Gagal memperbaharui angkot.`);
    }
  }

  async deleteVehicle(vehicleId) {
    const isVehicleExist = await this.verifyVehicleIsExist(vehicleId);

    if (!isVehicleExist) {
      throw new NotFoundError(
        `Angkot dengan Id [${vehicleId}] tidak ditemukan.`
      );
    }

    const modifiedBy = this._user.email;
    const modifiedAt = Date.now();

    const query = {
      text: 'UPDATE vehicles SET is_deleted = TRUE, modified_by = $1, modified_at = $2 WHERE id = $3 RETURNING id',
      values: [modifiedBy, modifiedAt, vehicleId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(
        `Terjadi kesalahan server. Gagal menghapus angkot.`
      );
    }
  }

  async deleteVehicles(vehicleIds) {
    let vehiclesDeleted = 0;

    await Promise.all(
      vehicleIds.map(async (id) => {
        await this.deleteVehicle(id);

        vehiclesDeleted++;
      })
    );

    return vehiclesDeleted;
  }

  async getVehicles(pageSize, skip, sort, sortBy, search) {
    const queryBuilder = `
      SELECT 
        vs.id, 
        vs.registration_number, 
        vs.total_passengers,
        vs.condition, 
        rs.name as route_name
      FROM 
        vehicles vs
      JOIN 
        vehicle_types vt
      ON 
        vs.vehicle_type_id = vt.id 
      JOIN
        routes rs
      ON
        vt.route_id = rs.id
      WHERE 
        vs.is_deleted = FALSE
        AND 
        LOWER(vs.registration_number || vs.condition || vs.total_passengers || rs.name) ILIKE LOWER($1)
      ORDER BY ${sortBy === 'route_name' ? `rs.name` : `vs.${sortBy}`} ${sort}
      LIMIT $2 OFFSET $3 
    `;

    const query = {
      text: queryBuilder,
      values: [`%${search}%`, pageSize, skip],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getVehiclesList() {
    const query = {
      text: 'SELECT id, registration_number FROM vehicles WHERE is_deleted = FALSE ORDER BY created_at DESC',
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getVehicle(id) {
    const query = {
      text: `
      SELECT 
        vs.id,
        vs.registration_number,
        vs.total_passengers,
        vs.condition,
        vs.brand,
        vs.vehicle_type_id,
        vs.user_id as driver_id,
        us.name as driver_name, 
        vs.created_at,
        vs.created_by,
        vs.is_deleted,
        vs.modified_at,
        vs.modified_by,
        vt.code,
        vt.color_name,
        vt.color_hex,
        rs.name as route_name 
      FROM 
        vehicles vs 
      JOIN 
        users us
      ON
        vs.user_id = us.id
      JOIN 
        vehicle_types vt 
      ON 
        vs.vehicle_type_id = vt.id 
      JOIN
        routes rs
      ON
        vt.route_id = rs.id
      WHERE 
        vs.id = $1 
      AND 
        vs.is_deleted = FALSE`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows[0]);
  }

  async getVehicleByDriverId(driverId) {
    const query = {
      text: `
      SELECT 
        *
      FROM 
        vehicles
      WHERE 
        user_id = $1 
      AND 
        is_deleted = FALSE`,
      values: [driverId],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows[0]);
  }

  async getVehicleByRegistrationNumber(registrationNumber, id = null) {
    const query = {
      text: id
        ? `SELECT * FROM vehicles WHERE registration_number = $1 AND id != $2 AND is_deleted = FALSE`
        : `SELECT * FROM vehicles WHERE registration_number = $1 AND is_deleted = FALSE`,
      values: id ? [registrationNumber, id] : [registrationNumber],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async verifyVehicleIsExist(vehicleId) {
    const query = {
      text: `SELECT EXISTS (SELECT 1 FROM vehicles WHERE id = $1 AND is_deleted = FALSE)`,
      values: [vehicleId],
    };

    const result = await this._pool.query(query);

    return result.rows[0].exists;
  }

  async getTotalCounts() {
    const query = {
      text: 'SELECT COUNT(*) FROM vehicles WHERE is_deleted = FALSE',
    };

    const result = await this._pool.query(query);

    return Number(result.rows[0].count);
  }
}

module.exports = VehicleRepositoryPostgres;
