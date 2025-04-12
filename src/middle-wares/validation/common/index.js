const appRoot = require("app-root-path");
const _get = require("lodash.get");
const appConstants = require(appRoot + "/src/constants/app-constants");
const { status, messages } = appConstants;

// In this method we will validate by id in database

exports.validateID = (model) => {
  return async (req, res, next) => {
    try {
      let id;
      if (_get(req, "body._id")) {
        id = _get(req, "body._id");
      }
      if (_get(req, "params.id")) {
        id = _get(req, "params.id");
      }
      if (_get(req, "query.id")) {
        id = _get(req, "query.id");
      }

      if (id) {
        const idToFind = await model.findById(id);
        if (!idToFind) {
          return res.status(status.notFound).json({
            message: `Sorry, we couldn't find record for the requested ID`,
          });
        }
      }
      next();
    } catch (error) {
      return res.status(status.serverError).json({
        message: messages.serverErrorMessage,
        error,
      });
    }
  };
};
