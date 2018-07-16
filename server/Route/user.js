const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.js')

router.get('/users', userController.getAllData);
router.get('/users/:key', userController.getData);
router.post('/users', userController.createData);
router.put('/users/:id', userController.updateData);
router.delete('/users/:id', userController.deleteData);
router.get('/users-dropdown', userController.getUserDropdown);
module.exports = router;