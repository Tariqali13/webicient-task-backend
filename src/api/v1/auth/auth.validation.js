const appRoot = require('app-root-path');
const Joi = require('joi');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;

const validateLogin = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().max(255).required(),
      password: Joi.string().max(255).required(),
    });
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    return res
      .status(status.validationError)
      .json({ message: err['details'][0]['message'] });
  }
};

const validateRegister = async (req, res, next) => {
  try {
    const schema = Joi.object({
      first_name: Joi.string().max(255).required(),
      last_name: Joi.string().max(255).required(),
      email: Joi.string().max(255).required(),
      password: Joi.string()
        .pattern(
          new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{1,255}$')
        )
        .required()
        .messages({
          'string.pattern.base':
            'Password must include at least one uppercase letter, one number, and one special character.',
          'string.empty': 'Password is required.',
        }),
    });
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    return res
      .status(status.validationError)
      .json({ message: err['details'][0]['message'] });
  }
};

module.exports = {
  validateLogin,
  validateRegister,
};
