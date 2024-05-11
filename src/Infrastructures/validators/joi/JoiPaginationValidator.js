const PaginationValidator = require('../../../Applications/validator/PaginationValidator');

class JoiPaginationValidator extends PaginationValidator {
  constructor(paginationValidator) {
    super();

    this._paginationValidator = paginationValidator;
  }

  async validatePaginationRequestQuery(query) {
    return this._paginationValidator.validatePaginationRequestQuery(query);
  }
}

module.exports = JoiPaginationValidator;
