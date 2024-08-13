const express = require('express');
const router = express.Router();
const deskController = require('../controllers').desk;

router.get('/', deskController.getDesks);
router.post('/', deskController.createDesk);

module.exports = router;
