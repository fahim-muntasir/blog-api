function generateErrorData(properties = {}) {
  const data = Object.entries(properties)
    .filter(([key, value]) => !value)
    .map(([key]) => ({ field: key, message: `${key} is required` }));

  return data;
}

const generateBadRequestError = (properties = {}) => {
  const error = new Error("Bad request.");
    error.status = 400;
    error.data = generateErrorData({ ...properties });

  return error;
}

module.exports = {
  generateBadRequestError
}