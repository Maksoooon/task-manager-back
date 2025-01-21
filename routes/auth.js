const express = require('express');
const router = express.Router();
const authController = require('../controllers').auth;
const tokenJobs = require('./../middlewares').tokenJobs;

router.get('/test', (req, res) => {
    res.status(200).json({
        status: "Succes"
    });
});
router.post('/login', authController.login);
router.post('/registration', authController.registration);
router.post('/me', tokenJobs.verifyToken, (req, res) => {
    console.log(req.headers.authorization)
    req.userId ? res.status(200).json({
        userId: req.userId
    }) : res.status(500).json({error: true})
    
})

module.exports = router;
