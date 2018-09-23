const express = require('express');
const router = express.Router();
const workSheetDetailController = require('../Controllers/workSheetDetailController.js')

router.get('/work-sheet-detail', workSheetDetailController.getAllData);
router.get('/work-sheet-detail/:key', workSheetDetailController.getData);
router.post('/work-sheet-detail', workSheetDetailController.createData);
router.put('/work-sheet-detail/:id', workSheetDetailController.updateData);
// router.delete('/work-sheet-detail/:id', workSheetDetailController.deleteData);
// router.get('/workSheet-duplicate', workSheetDetailController.checkDuplicate);
module.exports = router;