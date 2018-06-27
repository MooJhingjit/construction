const express = require('express');
const router = express.Router();
const orderingController = require('../Controllers/orderingController.js')

router.get('/ordering', orderingController.getAllData);
router.get('/ordering/:contractCode', orderingController.getData);
// router.post('/project', projectController.createData);
// router.put('/project/:id', projectController.updateData);
// router.delete('/project/:id', projectController.deleteData);
module.exports = router;