const appRoot = require('app-root-path');
const Project = require(appRoot + '/src/models/projects');
const appConstants = require(appRoot + '/src/constants/app-constants');
const { status, messages } = appConstants;

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    return res.status(status.success).json({
      message: 'Project found Successfully.',
      data: project,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const { records_per_page, page_no } = req.query;
    const query = req.query;
    const queryToSearch = {
      ...req.query,
      user_id: req.user_data.user_id,
    };
    const userData = req.user_data;
    const skipPage = parseInt(page_no) - 1;
    const limitPage = parseInt(records_per_page);
    const skipDocuments = skipPage * limitPage;
    const projects = await Project.find(queryToSearch)
      .limit(Number(records_per_page))
      .skip(skipDocuments)
      .sort({ createdAt: -1 });
    const totalNumberOfRecords = await Project.countDocuments(queryToSearch);
    return res.status(status.success).json({
      message: 'Projects found Successfully.',
      data: projects,
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

exports.createProject = async (req, res) => {
  try {
    const userData = req.user_data;
    const newObjToSave = {
      ...req.body,
      user_id: userData.user_id,
    };
    const project = await Project.create(newObjToSave);
    return res.status(status.success).json({
      message: 'Project Created Successfully.',
      data: project,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(status.success).json({
      message: 'Project Updated Successfully.',
      data: project,
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};

exports.deleteProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.deleteOne({ _id: id });
    return res.status(status.success).json({
      message: 'Project deleted Successfully.',
    });
  } catch (err) {
    return res.status(status.serverError).json({
      message: messages.serverErrorMessage,
    });
  }
};
