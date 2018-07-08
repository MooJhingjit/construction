const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController.js')

router.post('/login', authController.doAuth);

module.exports = router;