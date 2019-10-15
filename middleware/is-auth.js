const jwt = require('jsonwebtoken');

const errorHandler = require('../util/error')

module.exports = (req, res, next) => {

  // Check for authorisation header
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    errorHandler('Not authenticated.', 401)
  }

  // Check token is valid
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    errorHandler('Not authenticated.', 401)
  }
  req.userId = decodedToken.userId;
  next();
}