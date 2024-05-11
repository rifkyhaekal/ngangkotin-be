const RouteRepository = require('../../Domains/routes/RouteRepository');
const InternalServerError = require('../../Common/exceptions/InternalServerError');
const NotFoundError = require('../../Common/exceptions/NotFoundError');
const {
  convertKeysToCamelCase,
} = require('../../Common/helpers/StringMapperHelper');
const { context } = require('../http/middlewares/userContext');

class RouteRepositoryPostgres extends RouteRepository {
  constructor(pool) {
    super();

    this._pool = pool;
    this._user = context.user;
  }

  async deleteRoute(routeId) {
    const { exists: isRouteExist } = await this.verifyRouteIsExist(routeId);

    if (!isRouteExist) {
      throw new NotFoundError(`Rute dengan Id [${routeId}] tidak ditemukan.`);
    }

    const modifiedBy = this._user.email;
    const modifiedAt = Date.now();

    const query = {
      text: 'UPDATE routes SET is_deleted = TRUE, modified_by = $1, modified_at = $2 WHERE id = $3 RETURNING id',
      values: [modifiedBy, modifiedAt, routeId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(
        `Terjadi kesalahan server. Gagal menghapus rute.`
      );
    }
  }

  async deleteRoutes(routeIds) {
    let routesDeleted = 0;

    await Promise.all(
      routeIds.map(async (id) => {
        await this.deleteRoute(id);

        routesDeleted++;
      })
    );

    return routesDeleted;
  }

  async getRoutes(pageSize, skip, sort, sortBy, search) {
    const queryBuilder = `
      SELECT *
      FROM routes
      WHERE is_deleted = FALSE
        AND LOWER(name) ILIKE LOWER($1)
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

  async getRoutesList() {
    const queryBuilder = `
    SELECT id, name
    FROM routes
    WHERE is_deleted = FALSE
    ORDER BY created_at DESC
  `;

    const query = {
      text: queryBuilder,
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getRoute(id) {
    const query = {
      text: `SELECT 
          rs.id, 
          rs.name, 
          rs.distance, 
          rs.description,
          rsd.coordinates, 
          rs.created_at, 
          rs.created_by, 
          rs.modified_at, 
          rs.modified_by
        FROM routes rs
        JOIN route_details rsd ON rs.route_detail_id = rsd.id
        WHERE rs.id = $1
        GROUP BY rs.id, rsd.coordinates`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows[0]);
  }

  async verifyRouteIsExist(routeId) {
    const query = {
      text: `SELECT EXISTS (SELECT 1 FROM routes WHERE id = $1)`,
      values: [routeId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getRoutesTotalCount() {
    const query = {
      text: 'SELECT COUNT(*) FROM routes WHERE is_deleted = FALSE',
    };

    const result = await this._pool.query(query);

    return Number(result.rows[0].count);
  }
}

module.exports = RouteRepositoryPostgres;
