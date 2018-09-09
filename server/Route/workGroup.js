const express = require('express');
const router = express.Router();
const workGroupController = require('../Controllers/workGroupController.js')

router.get('/work-group', workGroupController.getAllData);
router.get('/work-group/:key', workGroupController.getData);
router.post('/work-group', workGroupController.createData);
router.put('/work-group/:id', workGroupController.updateData);
router.delete('/work-group/:id', workGroupController.deleteData);
router.get('/work-group-selection', workGroupController.getDropDown);
// router.get('/workGroup-duplicate', workGroupController.checkDuplicate);
module.exports = router;