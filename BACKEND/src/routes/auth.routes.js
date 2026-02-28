const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

// url/api/auth/register
router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);

//find out about token blacklisting
router.post('/logout',authController.logoutUser);
module.exports = router;

