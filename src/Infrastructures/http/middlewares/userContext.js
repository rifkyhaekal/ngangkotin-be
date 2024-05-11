const context = {
  user: null, // The authenticated user will be stored here
};

const createContext = (request) => {
  context.user = request.auth.credentials; // Assuming the user information is stored in auth.credentials
};

module.exports = { context, createContext };
