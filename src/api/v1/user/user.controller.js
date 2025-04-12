const appRoot = require("app-root-path");
const User = require(appRoot + "/src/models/user");
const appConstants = require(appRoot + "/src/constants/app-constants");
const { status, messages } = appConstants;

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(status.success).json({
      message: "User found Successfully.",
      data: user,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};
