const appRoot = require('app-root-path');
const Joi = require('joi');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status } = appConstants;

const validateGetProjectById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    await schema.validateAsync(req.params, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    return res
      .status(status.validationError)
      .json({ message: err['details'][0]['message'] });
  }
};

const validateGetAllProjects = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      page_no: Joi.number().optional(),
      records_per_page: Joi.number().optional(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateCreateProject = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateUpdateProjectById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
      }),
      params: Joi.object({
        id: Joi.string().required(),
      }),
    });
    await schema.validateAsync(
      {
        body: req.body,
        params: req.params,
      },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateDeleteProjectById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    await schema.validateAsync(req.params, {
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
  validateGetProjectById,
  validateGetAllProjects,
  validateCreateProject,
  validateDeleteProjectById,
  validateUpdateProjectById,
};
