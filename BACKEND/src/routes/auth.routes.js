const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();



// url/api/auth/register
router.post('/register', authController.registerUser);
// url/api/auth/login
router.post('/login', authController.loginUser);
// url/api/auth/login
router.get('/me', authController.getMe);

//find out about token blacklisting
router.post('/logout', authController.logoutUser);
module.exports = router;
