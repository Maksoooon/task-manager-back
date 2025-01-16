const express = require('express');
const router = express.Router();
const tokenJobs = require('./../middlewares').tokenJobs;
const sprintController = require('./../controllers').sprint;

router.post('/', tokenJobs.verifyToken, sprintController.createSprint);
router.get('/:uuid', tokenJobs.verifyToken, sprintController.getSprints);
router.patch('/:uuid', tokenJobs.verifyToken, sprintController.updateSprint);

module.exports = router;