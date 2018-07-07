const express = require('express');
const router = express.Router();
const orderingController = require('../Controllers/orderingController.js')

router.get('/ordering-home', orderingController.getResource);
router.get('/ordering', orderingController.getAllData);
router.get('/ordering/:contractCode', orderingController.getData);
router.post('/ordering-extra', orderingController.createExtraData);
router.put('/ordering/:id', orderingController.updateData);
router.delete('/ordering/:id', orderingController.deleteData);
module.exports = router;