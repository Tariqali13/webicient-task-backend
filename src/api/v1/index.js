const express = require("express");
const router = express.Router();
const auth = require("./auth");
const user = require("./user");
const project = require("./project");
const task = require("./task");

router.use("/auth", auth);
router.use("/user", user);
router.use("/projects", project);
router.use("/tasks", task);

module.exports = router;
