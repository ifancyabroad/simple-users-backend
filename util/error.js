module.exports = errorHandler = (message, code, data) => {
  const error = new Error(message);
  error.statusCode = code;
  if (data) {
    error.data = data;
  }
  throw error;
}