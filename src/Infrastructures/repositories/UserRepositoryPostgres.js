const AlreadyExistsError = require('../../Common/exceptions/AlreadyExistsError');
const InternalServerError = require('../../Common/exceptions/InternalServerError');
const InvalidOperationError = require('../../Common/exceptions/InvalidOperationError');
const NotFoundError = require('../../Common/exceptions/NotFoundError');
const {
  convertKeysToCamelCase,
} = require('../../Common/helpers/StringMapperHelper');
const UserRepository = require('../../Domains/users/UserRepository');
const { context } = require('../http/middlewares/userContext');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
    this._user = context.user;
  }

  async addUser(registerUser) {
    const {
      name,
      email,
      password,
      phoneNumber,
      profilePhotoUrl,
      isEmailVerified,
      gender,
      address,
      idCardNumber,
      dateOfBirth,
      roleName,
    } = registerUser;

    const id = this._idGenerator(21);
    const userRoleId = this._idGenerator(21);
    const currentDate = Date.now();
    const currentUser = this._user?.email ?? email;

    const userQuery = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id',
      values: [
        id,
        name,
        email,
        password,
        phoneNumber,
        profilePhotoUrl,
        isEmailVerified,
        gender,
        address,
        idCardNumber,
        dateOfBirth,
        currentDate,
        currentUser,
        false,
        null,
        null,
      ],
    };

    const roleQuery = {
      text: 'SELECT id FROM roles WHERE name = $1',
      values: [roleName],
    };

    const userRolesQuery = {
      text: 'INSERT INTO user_roles VALUES($1, $2, $3, $4, $5)',
      values: [userRoleId, id, null, currentDate, currentUser],
    };

    const client = await this._pool.connect();

    try {
      await client.query('BEGIN');

      const userResult = await client.query(userQuery);
      const insertedUserId = userResult.rows[0].id;

      const roleResult = await client.query(roleQuery);
      const roleId = roleResult.rows[0].id;

      userRolesQuery.values[2] = roleId;
      await client.query(userRolesQuery);

      await client.query('COMMIT');

      return insertedUserId;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async updateUser(updateUser) {
    const {
      id,
      name,
      email,
      phoneNumber,
      profilePhotoUrl,
      isEmailVerified,
      gender,
      address,
      idCardNumber,
      dateOfBirth,
    } = updateUser;

    const isUserExist = await this.verifyUserIsExist(id);
    if (!isUserExist) {
      throw new NotFoundError(`User dengan Id [${id}] tidak ditemukan.`);
    }

    const isEmailExist = await this.verifyAvailableEmail(email, id);

    if (isEmailExist) {
      throw new AlreadyExistsError(`Email sudah terdaftar.`);
    }

    if (phoneNumber !== null) {
      const isPhoneNumberExist = await this.verifyAvailablePhoneNumber(
        phoneNumber,
        id
      );

      if (isPhoneNumberExist) {
        throw new AlreadyExistsError(`Nomor handphone sudah terdaftar.`);
      }
    }

    if (idCardNumber !== null) {
      const isIdCardNumberExist = await this.verifyAvailableIdCardNumber(
        idCardNumber,
        id
      );

      if (isIdCardNumberExist) {
        throw new AlreadyExistsError(`Nomor KTP sudah terdaftar.`);
      }
    }

    const currentDate = Date.now();
    const currentUser = this._user.email;

    const query = {
      text: 'UPDATE users SET name = $1, email = $2, phone_number = $3, profile_photo_url = $4, is_email_verified = $5, gender = $6, address = $7, id_card_number = $8, date_of_birth = $9, modified_at = $10, modified_by = $11 WHERE id = $12 RETURNING id',
      values: [
        name,
        email,
        phoneNumber,
        profilePhotoUrl,
        isEmailVerified,
        gender,
        address,
        idCardNumber,
        dateOfBirth,
        currentDate,
        currentUser,
        id,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(`Gagal memperbaharui user.`);
    }
  }

  async deleteUser(userId) {
    const isUserExist = await this.verifyUserIsExist(userId);

    if (!isUserExist) {
      throw new NotFoundError(`User tidak ditemukan.`);
    }

    const modifiedBy = this._user.email;
    const modifiedAt = Date.now();

    const query = {
      text: 'UPDATE users SET is_deleted = TRUE, modified_by = $1, modified_at = $2 WHERE id = $3 RETURNING id',
      values: [modifiedBy, modifiedAt, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InternalServerError(
        `Terjadi kesalahan server. Gagal menghapus user.`
      );
    }
  }

  async deleteUsers(userIds) {
    let usersDeleted = 0;

    await Promise.all(
      userIds.map(async (id) => {
        await this.deleteUser(id);

        usersDeleted++;
      })
    );

    return usersDeleted;
  }

  async getUsersByRoleName(pageSize, skip, sort, sortBy, search, roleName) {
    const queryBuilder = `SELECT 
          us.id,
          us.name,
          us.email,
          us.phone_number,
          us.profile_photo_url,
          us.is_email_verified,
          us.gender,
          us.address,
          us.id_card_number,
          us.date_of_birth,
          us.created_at,
          us.created_by,
          us.is_deleted,
          us.modified_at,
          us.modified_by
        FROM 
          users us
        JOIN 
          user_roles ur
        ON 
          us.id = ur.user_id 
        JOIN 
          roles rs 
        ON 
          ur.role_id = rs.id
        WHERE 
          us.is_deleted = FALSE
          AND
            LOWER(rs.name) = LOWER($1)
          AND (LOWER(us.name) ILIKE LOWER($2)
            OR LOWER(us.email) ILIKE LOWER($2)
            OR LOWER(us.phone_number) ILIKE LOWER($2))
        ORDER BY us.${sortBy} ${sort}
        LIMIT $3 OFFSET $4`;

    const query = {
      text: queryBuilder,
      values: [roleName, `%${search}%`, pageSize, skip],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getUsersListByRoleName(roleName) {
    const query = {
      text: 'SELECT us.id, us.name, us.id_card_number FROM users us JOIN user_roles ur ON ur.user_id = us.id JOIN roles rs ON ur.role_id = rs.id WHERE LOWER(rs.name) = LOWER($1) AND us.is_deleted = FALSE ORDER BY us.created_at DESC',
      values: [roleName],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows);
  }

  async getUserById(id) {
    const isUserExist = await this.verifyUserIsExist(id);

    if (!isUserExist) {
      throw new NotFoundError(`User dengan Id [${id}] tidak ditemukan.`);
    }

    const query = {
      text: `
      SELECT 
        id,
        name,
        email,
        phone_number,
        profile_photo_url,
        is_email_verified,
        gender,
        address,
        id_card_number,
        date_of_birth,
        created_at,
        created_by,
        is_deleted,
        modified_at,
        modified_by
      FROM 
        users
      WHERE 
        id = $1 
      AND 
        is_deleted = FALSE`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return convertKeysToCamelCase(result.rows[0]);
  }

  async getUserRolesByUserId(userId) {
    const isUserExist = await this.verifyUserIsExist(userId);

    if (!isUserExist) {
      throw new NotFoundError(`User dengan Id [${userId}] tidak ditemukan.`);
    }

    const query = {
      text: 'SELECT JSONB_AGG(r.name) AS roles FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = $1',
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getUsersTotalCountByRoleName(roleName) {
    const roleNameLower = roleName.toLowerCase();

    const query = {
      text: 'SELECT COUNT(*) FROM users us JOIN user_roles ur ON us.id = ur.user_id JOIN roles rs ON ur.role_id = rs.id WHERE LOWER(rs.name) = $1 AND us.is_deleted = FALSE',
      values: [roleNameLower],
    };

    const result = await this._pool.query(query);
    return Number(result.rows[0].count);
  }

  async getPasswordByEmail(email) {
    const query = {
      text: 'SELECT password FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvalidOperationError('email atau password tidak valid');
    }

    return result.rows[0].password;
  }

  async getIdByEmail(email) {
    const query = {
      text: 'SELECT id FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }

    const { id } = result.rows[0];

    return id;
  }

  async verifyUserIsExist(id) {
    const query = {
      text: `SELECT EXISTS (SELECT 1 FROM users WHERE id = $1)`,
      values: [id],
    };

    const result = await this._pool.query(query);

    return result.rows[0].exists;
  }

  async verifyAvailableEmail(email, id = null) {
    const query = {
      text: id
        ? `SELECT EXISTS (SELECT * FROM users WHERE email = $1 AND id != $2 AND is_deleted = FALSE)`
        : `SELECT EXISTS (SELECT * FROM users WHERE email = $1 AND is_deleted = FALSE)`,
      values: id ? [email, id] : [email],
    };

    const result = await this._pool.query(query);

    return result.rows[0].exists;
  }

  async verifyAvailablePhoneNumber(phoneNumber, id = null) {
    const query = {
      text: id
        ? `SELECT EXISTS (SELECT * FROM users WHERE phone_number = $1 AND id != $2 AND is_deleted = FALSE)`
        : `SELECT EXISTS (SELECT * FROM users WHERE phone_number = $1 AND is_deleted = FALSE)`,
      values: id ? [phoneNumber, id] : [phoneNumber],
    };

    const result = await this._pool.query(query);

    return result.rows[0].exists;
  }

  async verifyAvailableIdCardNumber(idCardNumber, id = null) {
    const query = {
      text: id
        ? `SELECT EXISTS (SELECT * FROM users WHERE id_card_number = $1 AND id != $2 AND is_deleted = FALSE)`
        : `SELECT EXISTS (SELECT * FROM users WHERE id_card_number = $1 AND is_deleted = FALSE)`,
      values: id ? [idCardNumber, id] : [idCardNumber],
    };

    const result = await this._pool.query(query);

    return result.rows[0].exists;
  }
}

module.exports = UserRepositoryPostgres;
