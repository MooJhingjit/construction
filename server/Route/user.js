const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js')

router.get('/users', userController.getAllUsers);
router.get('/users/:key', userController.getUser);
router.post('/users', userController.create);
module.exports = router;