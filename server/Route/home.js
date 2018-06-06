const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/homeController.js')

router.get('/home', homeController.getData);
// router.get('/house-selection', houseController.getDropDown);
// router.post('/house', houseController.createData);
// router.put('/house/:id', houseController.updateData);
// router.delete('/house/:id', houseController.deleteData);
module.exports = router;