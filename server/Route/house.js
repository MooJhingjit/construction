const express = require('express');
const router = express.Router();
const houseController = require('../Controllers/houseController.js')

router.get('/house', houseController.getAllData);
router.get('/house-selection', houseController.getDropDown);
router.post('/house', houseController.createData);
router.put('/house/:id', houseController.updateData);
router.delete('/house/:id', houseController.deleteData);
module.exports = router;