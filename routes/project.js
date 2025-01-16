const express = require('express');
const router = express.Router();
const tokenJobs = require('./../middlewares').tokenJobs;
const projectController = require('./../controllers').project;

router.post('/create', tokenJobs.verifyToken, projectController.createProject);
router.get('/', tokenJobs.verifyToken, projectController.getProjects);
router.patch('/:uuid', tokenJobs.verifyToken, projectController.updateProject);
router.delete('/:uuid', tokenJobs.verifyToken, projectController.deleteProject);

module.exports = router;
