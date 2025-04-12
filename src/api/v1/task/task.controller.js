const appRoot = require('app-root-path');
const Task = require(appRoot + '/src/models/tasks');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;
const commonUtil = require(appRoot + '/src/utils/common-util');
const orderByUtil = commonUtil.orderBy();

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('project_id');
    return res.status(status.success).json({
      message: 'Task found Successfully.',
      data: task,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { records_per_page, page_no } = req.query;
    const query = req.query;
    const queryToSearch = {
      ...req.query,
      user_id: req.user_data.user_id,
    };
    const skipPage = parseInt(page_no) - 1;
    const limitPage = parseInt(records_per_page);
    const skipDocuments = skipPage * limitPage;
    const tasks = await Task.find(queryToSearch)
      .limit(Number(records_per_page))
      .skip(skipDocuments)
      .sort({ order_by: 1 })
      .populate('project_id');
    const totalNumberOfRecords = await Task.countDocuments(queryToSearch);
    return res.status(status.success).json({
      message: 'Tasks found Successfully.',
      data: tasks,
      page_no: page_no,
      records_per_page: records_per_page,
      total_number_of_records: totalNumberOfRecords,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const userData = req.user_data;
    req.body.user_id = userData.user_id;
    req.body.order_by = await orderByUtil.getOrder(Task, {});
    const task = await Task.create(req.body);
    return res.status(status.success).json({
      message: 'Task Created Successfully.',
      data: task,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.order_by = await orderByUtil.getOrder(Task, {});
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(status.success).json({
      message: 'Task Updated Successfully.',
      data: task,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.updateTaskStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(status.success).json({
      message: 'Task Updated Successfully.',
      data: task,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.deleteOne({ _id: id });
    return res.status(status.success).json({
      message: 'Task deleted Successfully.',
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.updateTaskOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { newOrderBy } = req.body;
    const userData = req.user_data;
    const tasks = await Task.find({ user_id: userData.user_id }).sort({
      order_by: 1,
    });
    // Remove the dragged task
    const movingTask = tasks.find((task) => task._id.toString() === id);
    const filteredTasks = tasks.filter((task) => task._id.toString() !== id);

    // Insert the moving task into the new position
    filteredTasks.splice(newOrderBy, 0, movingTask);

    // Reassign order_by to all
    const bulkOps = filteredTasks.map((task, index) => ({
      updateOne: {
        filter: { _id: task._id },
        update: { order_by: index },
      },
    }));

    await Task.bulkWrite(bulkOps);

    return res.status(status.success).json({
      message: 'Order changed successfully.',
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};
