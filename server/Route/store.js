const express = require('express');
const router = express.Router();
const storeController = require('../Controllers/storeController.js')

router.get('/store', storeController.getAllData);
router.get('/store/:key', storeController.getData);
router.post('/store', storeController.createData);
router.put('/store/:id', storeController.updateData);
router.delete('/store/:id', storeController.deleteData);
router.get('/store-selection', storeController.getDropDown);

module.exports = router;