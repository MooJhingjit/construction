const express = require('express');
const router = express.Router();
const contractController = require('../Controllers/contractController.js')

router.get('/contract', contractController.getAllData);
router.get('/contract/:key', contractController.getData);
router.post('/contract', contractController.createData);
router.put('/contract/:id', contractController.updateData);
router.delete('/contract/:id', contractController.deleteData);
module.exports = router;