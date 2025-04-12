const appRoot = require('app-root-path');
const express = require('express');
const router = express.Router();
const taskValidations = require('./task.validation');
const taskController = require('./task.controller');
const jwtValidations = require(appRoot + '/src/middle-wares/auth');
const CommonMiddleware = require(appRoot +
  '/src/middle-wares/validation/common');
const Task = require(appRoot + '/src/models/tasks');

router.get(
  '/:id',
  [
    jwtValidations,
    taskValidations.validateGetTaskById,
    CommonMiddleware.validateID(Task),
  ],
  taskController.getTaskById
);

router.get(
  '/',
  [jwtValidations, taskValidations.validateGetAllTasks],
  taskController.getAllTasks
);

router.delete(
  '/:id',
  [
    jwtValidations,
    CommonMiddleware.validateID(Task),
    taskValidations.validateDeleteTaskById,
  ],
  taskController.deleteTaskById
);

router.put(
  '/:id',
  [
    jwtValidations,
    CommonMiddleware.validateID(Task),
    taskValidations.validateUpdateTaskById,
  ],
  taskController.updateTaskById
);

router.put(
  '/status-update/:id',
  [
    jwtValidations,
    CommonMiddleware.validateID(Task),
    taskValidations.validateUpdateTaskStatusById,
  ],
  taskController.updateTaskStatusById
);

router.put(
  '/reorder/:id',
  [
    jwtValidations,
    CommonMiddleware.validateID(Task),
    taskValidations.validateUpdateTaskOrderById,
  ],
  taskController.updateTaskOrderById
);

router.post(
  '/',
  [jwtValidations, taskValidations.validateCreateTask],
  taskController.createTask
);

module.exports = router;
