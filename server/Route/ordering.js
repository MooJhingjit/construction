const express = require('express');
const router = express.Router();
const orderingController = require('../Controllers/orderingController.js')

router.get('/ordering', orderingController.getAllData);
// router.get('/project/:key', projectController.getData);
// router.post('/project', projectController.createData);
// router.put('/project/:id', projectController.updateData);
// router.delete('/project/:id', projectController.deleteData);
module.exports = router;