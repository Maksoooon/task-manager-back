const express = require('express');
const router = express.Router();
const taskController = require('../controllers').task;

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);

module.exports = router;
