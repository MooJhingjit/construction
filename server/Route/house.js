const express = require('express');
const router = express.Router();
const houseController = require('../Controllers/houseController.js')

router.get('/house', houseController.getAllData);
router.get('/house-selection', houseController.getDropDown);
router.get('/plan-selection', houseController.getPlanDropDown);
router.post('/house', houseController.createData);
router.put('/house/:id', houseController.updateData);
router.delete('/house/:id', houseController.deleteData);
router.get('/house/color-selection', houseController.getColorDropDown);
router.post('/house/color', houseController.createColorData);
module.exports = router;