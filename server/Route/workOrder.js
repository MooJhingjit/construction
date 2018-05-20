const express = require('express');
const router = express.Router();
const workOrderController = require('../Controllers/workOrderController.js')

router.get('/work-order', workOrderController.getAllData);
router.get('/work-order/:key', workOrderController.getData);
router.post('/work-order', workOrderController.createData);
router.put('/work-order/:id', workOrderController.updateData);
// router.delete('/work-order/:id', workOrderController.deleteData);
module.exports = router;