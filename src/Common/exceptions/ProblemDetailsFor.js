const ProblemDetailsFor = {
  ValidationError: {
    Type: 'https://www.rfc-editor.org/rfc/rfc4918#section-11.2',
    Title: 'One or more validation errors occurred.',
  },

  UnauthorizedAccessError: {
    Type: 'https://tools.ietf.org/html/rfc7235#section-3.1',
    Title: 'You must be authorized to access this resource.',
  },

  ForbiddenAccessError: {
    Type: 'https://tools.ietf.org/html/rfc7231#section-6.5.3',
    Title: 'You are forbidden to access this resource.',
  },

  NotFoundError: {
    Type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
    Title: 'The specified resource was not found.',
  },

  AlreadyExistsError: {
    Type: 'https://tools.ietf.org/html/rfc7231#section-6.5.8',
    Title: 'The specified resource was duplicate or conflict.',
  },

  ArgumentError: {
    Type: 'https://datatracker.ietf.org/doc/html/rfc4918#section-11.2',
    Title: 'One or more argument is not valid.',
  },

  MismatchError: {
    Type: 'https://datatracker.ietf.org/doc/html/rfc4918#section-11.2',
    Title:
      'There is a mismatch between the value in the Route and the value in the Form.',
  },

  InvalidOperationError: {
    Type: 'https://datatracker.ietf.org/doc/html/rfc4918#section-11.2',
    Title:
      'Cannot complete the operation because one or more related objects are not in proper state.',
  },

  UnknownError: {
    Type: 'https://tools.ietf.org/html/rfc7231#section-6.6.1',
    Title: 'An error occurred while processing your request.',
  },
};

module.exports = ProblemDetailsFor;
