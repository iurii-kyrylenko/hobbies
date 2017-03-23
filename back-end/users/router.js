const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({ secret: process.env.JWT_SECRET });
const userController = require('./controller');

router.use('/register', userController.validateCaptchaResponse);
router.use('/settings', auth);

router.get('/', userController.getUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/settings', userController.getSettings);
router.put('/settings', userController.updateSettings);

module.exports = router;
