const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const projectValidations = require('./project.validation');
const projectController = require('./project.controller');
const jwtValidations = require(appRoot + '/src/middle-wares/auth');
const CommonMiddleware = require(appRoot +
  '/src/middle-wares/validation/common');
const Project = require(appRoot + '/src/models/projects');

router.get(
  '/:id',
  [
    jwtValidations,
    projectValidations.validateGetProjectById,
    CommonMiddleware.validateID(Project),
  ],
  projectController.getProjectById
);

router.get(
  '/',
  [jwtValidations, projectValidations.validateGetAllProjects],
  projectController.getAllProjects
);

router.delete(
  '/:id',
  [
    jwtValidations,
    CommonMiddleware.validateID(Project),
    projectValidations.validateDeleteProjectById,
  ],
  projectController.deleteProjectById
);

router.put(
  '/:id',
  [
    jwtValidations,
    CommonMiddleware.validateID(Project),
    projectValidations.validateUpdateProjectById,
  ],
  projectController.updateProjectById
);

router.post(
  '/',
  [jwtValidations, projectValidations.validateCreateProject],
  projectController.createProject
);

module.exports = router;
