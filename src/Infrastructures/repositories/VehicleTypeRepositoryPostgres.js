const VehicleTypeRepository = require('../../Domains/vehicle_types/VehicleTypeRepository');
const InternalServerError = require('../../Common/exceptions/InternalServerError');
const NotFoundError = require('../../Common/exceptions/NotFoundError');
const AlreadyExistsError = require('../../Common/exceptions/AlreadyExistsError');
const {
  convertKeysToCamelCase,
} = require('../../Common/helpers/StringMapperHelper');
const { context } = require('../http/middlewares/userContext');

class VehicleTypeRepositoryPostgres extends VehicleTypeRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
    this._user = context.user;
  }

  async addVehicleType(addVehicleType) {
    const { code, colorName, colorHex, routeId } = addVehicleType;

    const isCodeExist = await this.getVehicleTypeByCode(code);

    if (isCodeExist) {
      throw new AlreadyExistsError(`Nomor Angkot [${code}] sudah terdaftar.`);
    }

    const id = this._idGenerator(21);
    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'INSERT INTO vehicle_types(id, code, color_name, color_hex, route_id, created_at, created_by, is_deleted) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        code,
        colorName,
        colorHex,
        routeId,
        currentDate,
        currentUser,
        false,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InternalServerError(`Gagal menambahkan tipe angkot.`);
    }

    return result.rows[0].id;
  }

  async updateVehicleType(updateVehicleType) {
    const { id, code, colorName, colorHex, routeId } = updateVehicleType;

    const { exists: isVehicleTypeExist } = await this.verifyVehicleTypeIsExist(
      id
    );

    if (!isVehicleTypeExist) {
      throw new NotFoundError(`Tipe Angkot dengan Id [${id}] tidak ditemukan.`);
    }

    const isVehicleTypeCodeExist = await this.getVehicleTypeByCode(code, id);

    if (isVehicleTypeCodeExist) {
      throw new AlreadyExistsError(`Kode angkot [${code}] sudah terdaftar.`);
    }

    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'UPDATE vehicle_types SET code = $1, color_name = $2, color_hex = $3, route_id = $4, modified_at = $5, modified_by = $6 WHERE id = $7 RETURNING id',
      values: [
        code,
        colorName,
        colorHex,
        routeId,
        currentDate,
        currentUser,
        id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(`Gagal memperbaharui tipe angkot.`);
    }
  }

  async deleteVehicleType(vehicleTypeId) {
    const isVehicleTypeExist = await this.verifyVehicleTypeIsExist(
      vehicleTypeId
    );

    if (!isVehicleTypeExist) {
      throw new NotFoundError(
        `Tipe Angkot dengan Id [${vehicleTypeId}] tidak ditemukan.`
      );
    }

    const modifiedBy = this._user.email;
    const modifiedAt = Date.now();

    const query = {
      text: 'UPDATE vehicle_types SET is_deleted = TRUE, modified_by = $1, modified_at = $2 WHERE id = $3 RETURNING id',
      values: [modifiedBy, modifiedAt, vehicleTypeId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(
        `Terjadi kesalahan server. Gagal menghapus tipe angkot.`
      );
    }
  }

  async deleteVehicleTypes(vehicleTypeIds) {
    let vehicleTypesDeleted = 0;

    await Promise.all(
      vehicleTypeIds.map(async (id) => {
        await this.deleteVehicleType(id);

        vehicleTypesDeleted++;
      })
    );

    return vehicleTypesDeleted;
  }

  async getVehicleTypes(pageSize, skip, sort, sortBy, search) {
    const queryBuilder = `
      SELECT 
        id, 
        code, 
        color_name,
        color_hex, 
        created_at 
      FROM 
        vehicle_types
      WHERE 
        is_deleted = FALSE
        AND 
        LOWER(code || color_name) ILIKE LOWER($1)
      ORDER BY ${sortBy} ${sort}
      LIMIT $2 OFFSET $3 
    `;

    const query = {
      text: queryBuilder,
      values: [`%${search}%`, pageSize, skip],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getVehicleTypesList() {
    const query = {
      text: 'SELECT id, code FROM vehicle_types WHERE is_deleted = FALSE ORDER BY created_at DESC',
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getVehicleType(id) {
    const query = {
      text: `SELECT vt.*, rs.name as route_name FROM vehicle_types vt JOIN routes rs ON vt.route_id = rs.id WHERE vt.id = $1 AND vt.is_deleted = FALSE`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows[0]);
  }

  async getVehicleTypeByCode(code, id = null) {
    const query = {
      text: id
        ? `SELECT * FROM vehicle_types WHERE code = $1 AND id != $2 AND is_deleted = FALSE`
        : `SELECT * FROM vehicle_types WHERE code = $1 AND is_deleted = FALSE`,
      values: id ? [code, id] : [code],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async verifyVehicleTypeIsExist(vehicleTypeId) {
    const query = {
      text: `SELECT EXISTS (SELECT 1 FROM vehicle_types WHERE id = $1)`,
      values: [vehicleTypeId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getTotalCounts() {
    const query = {
      text: 'SELECT COUNT(*) FROM vehicle_types WHERE is_deleted = FALSE',
    };

    const result = await this._pool.query(query);

    return Number(result.rows[0].count);
  }
}

module.exports = VehicleTypeRepositoryPostgres;
