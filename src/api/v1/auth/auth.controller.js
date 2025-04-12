const appRoot = require('app-root-path');
const User = require(appRoot + '/src/models/user');
const authUtil = require(appRoot + '/src/utils/auth-util');
const bcrypt = require('bcryptjs');
const _get = require('lodash.get');
const auth = authUtil.auth();
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: new RegExp('^' + email + '$', 'i'),
    });
    if (!user) {
      return res.status(status.notFound).json({
        message: 'No User Found',
      });
    }
    const matchPassword = await bcrypt.compare(
      password,
      _get(user, 'password')
    );
    if (!matchPassword) {
      return res.status(status.unauthorized).json({
        message: 'Invalid Email and Password',
      });
    }
    let dataToSend = JSON.parse(JSON.stringify(user));
    const tokenPayload = {
      user_name: _get(user, 'first_name') + ' ' + _get(user, 'last_name'),
      user_id: _get(user, '_id'),
      email: _get(user, 'email'),
    };
    const token = await auth.generateToken(tokenPayload);
    delete dataToSend.password;
    delete dataToSend._id;
    delete dataToSend.is_active;
    return res.status(status.success).json({
      message: 'Login Successfully.',
      data: dataToSend,
      token: token,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { password } = req.body;
    req.body.password = await auth.generateHash(password);
    const user = await User.create(req.body);
    return res.status(status.success).json({
      message:
        'Account Created Successfully. Please login with registered email',
      data: user,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.user_data = null;
    req.session.destroy();
    req.logOut();
    return res.status(status.success).json({
      message: 'Logout.',
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};
