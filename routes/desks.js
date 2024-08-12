const express = require('express');
const router = express.Router();
const deskController = require('../controllers').desk;

router.get('/get-desks', deskController.getDesks);
router.post('/create', deskController.createDesk);

module.exports = router;
