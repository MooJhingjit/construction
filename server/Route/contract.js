const express = require('express');
const router = express.Router();
const contractController = require('../Controllers/contractController.js')

router.get('/contract', contractController.getAllData);
router.get('/contract/:key', contractController.getData);
router.get('/contract-period/:house_id', contractController.getContractPeriod);
router.post('/contract', contractController.createData);
router.put('/contract-status/:id', contractController.updateContractStatus);
router.put('/contract-time/:id', contractController.updateTimeData);
router.put('/contract-process/:id', contractController.editContractProcess);
router.delete('/contract/:id', contractController.deleteData);
module.exports = router;