const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const authValidations = require('./auth.validation');
const authController = require('./auth.controller');
const jwtValidations = require(appRoot + '/src/middle-wares/auth');
const UserMiddleware = require(appRoot + '/src/middle-wares/validation/user');

router.post('/login', authValidations.validateLogin, authController.login);

router.post(
  '/register',
  [authValidations.validateRegister, UserMiddleware.validateUserWithEmail],
  authController.register
);

router.get('/logout', jwtValidations, authController.logoutUser);

module.exports = router;
