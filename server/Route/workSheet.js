const express = require('express');
const router = express.Router();
const workSheetController = require('../Controllers/workSheetController.js')

router.get('/work-sheet', workSheetController.getAllData);
router.get('/work-sheet/:key', workSheetController.getData);
router.post('/work-sheet', workSheetController.createData);
router.put('/work-sheet/:id', workSheetController.updateData);
router.delete('/work-sheet/:id', workSheetController.deleteData);

router.put('/work-sheet/approval/:id', workSheetController.updateData);
module.exports = router;