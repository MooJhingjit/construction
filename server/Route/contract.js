const express = require('express');
const router = express.Router();
const contractController = require('../Controllers/contractController.js')

// router.get('/contract', contractController.getAllData);
// router.get('/contract/:key', contractController.getData);
router.post('/contract', contractController.create);
// router.put('/contract/:id', contractController.update);
// router.delete('/contract/:id', contractController.delete);
module.exports = router;