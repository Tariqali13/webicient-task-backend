const appRoot = require('app-root-path');
const jwt = require('jsonwebtoken');
const appConstants = require(appRoot + '/src/constants/app-constants');

module.exports = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    // check token
    if (!token) {
      return res.status(401).json({
        message: 'No token, Auth Denied!!!',
        statusCode: '401',
        statusDesc: 'You are not authorized to access this protected resource',
      });
    }
    if (token) {
      const protectedToken = token.slice('Bearer '.length);
      const decode = jwt.verify(protectedToken, appConstants.tokenKey);
      req.user_data = decode;
    }
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Token Expire. Please Login again!',
    });
  }
};
