const appRoot = require('app-root-path');
const Joi = require('joi');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status } = appConstants;

const validateGetTaskById = async (req, res, next) => {
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

const validateGetAllTasks = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      page_no: Joi.number().optional(),
      records_per_page: Joi.number().optional(),
      project_id: Joi.string().optional().allow(''),
      status: Joi.string().optional().allow(''),
      due_date: Joi.string().optional().allow(''),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateCreateTask = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      project_id: Joi.string().required(),
      status: Joi.string().required(),
      due_date: Joi.string().required(),
    });
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateUpdateTaskById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        project_id: Joi.string().required(),
        status: Joi.string().required(),
        due_date: Joi.string().required(),
      }),
      params: Joi.object({
        id: Joi.string().required(),
      }),
    });
    await schema.validateAsync({
      body: req.body,
      params: req.params,
    });
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateUpdateTaskStatusById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      body: Joi.object({
        status: Joi.string().required(),
      }),
      params: Joi.object({
        id: Joi.string().required(),
      }),
    });
    await schema.validateAsync({
      body: req.body,
      params: req.params,
    });
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateUpdateTaskOrderById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      body: Joi.object({
        newOrderBy: Joi.number().required(),
      }),
      params: Joi.object({
        id: Joi.string().required(),
      }),
    });
    await schema.validateAsync({
      body: req.body,
      params: req.params,
    });
    next();
  } catch (error) {
    return res
      .status(status.validationError)
      .json({ message: error['details'][0]['message'] });
  }
};

const validateDeleteTaskById = async (req, res, next) => {
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
  validateGetTaskById,
  validateGetAllTasks,
  validateCreateTask,
  validateDeleteTaskById,
  validateUpdateTaskById,
  validateUpdateTaskStatusById,
  validateUpdateTaskOrderById,
};
