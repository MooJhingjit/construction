const express = require('express');
const router = express.Router();
const materialGroupController = require('../Controllers/materialGroupController.js')

router.get('/material-group', materialGroupController.getAllData);
router.get('/material-group/:key', materialGroupController.getData);
router.post('/material-group', materialGroupController.createData);
router.put('/material-group/:id', materialGroupController.updateData);
router.delete('/material-group/:id', materialGroupController.deleteData);
module.exports = router;