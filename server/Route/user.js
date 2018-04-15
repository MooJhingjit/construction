const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js')

router.get('/user/:key', userController.getUser);
router.post('/user/', userController.addUser);
module.exports = router;