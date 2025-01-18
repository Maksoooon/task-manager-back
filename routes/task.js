const express = require('express');
const router = express.Router();
const tokenJobs = require('./../middlewares').tokenJobs;
const taskController = require('./../controllers').task;

router.post('/', tokenJobs.verifyToken, taskController.createTask);
router.get('/:uuid', tokenJobs.verifyToken, taskController.getTasks);
router.get('/get-one/:uuid', tokenJobs.verifyToken, taskController.getTask);
router.patch('/:uuid', tokenJobs.verifyToken, taskController.updateTask);

module.exports = router;