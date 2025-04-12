const appRoot = require("app-root-path");
const Joi = require("joi");
const appConstants = require(appRoot + "/src/constants/app-constants");
const { status } = appConstants;


const validateGetUserById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    await schema.validateAsync(req.params);
    next();
  } catch (err) {
    return res
      .status(status.validationError)
      .json({ message: err["details"][0]["message"] });
  }
};

module.exports = {
  validateGetUserById,
};
