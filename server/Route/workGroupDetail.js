const express = require('express');
const router = express.Router();
const workGroupDetailController = require('../Controllers/workGroupDetailController.js')

router.get('/work-group-detail', workGroupDetailController.getAllData);
router.get('/work-group-detail/:key', workGroupDetailController.getData);
router.post('/work-group-detail', workGroupDetailController.createData);
router.put('/work-group-detail/:id', workGroupDetailController.updateData);
router.delete('/work-group-detail/:id', workGroupDetailController.deleteData);
// router.get('/workGroup-selection', workGroupDetailController.getDropDown);
// router.get('/workGroup-duplicate', workGroupDetailController.checkDuplicate);
module.exports = router;