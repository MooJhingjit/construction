const express = require('express');
const router = express.Router();
const frontSiteController = require('../Controllers/frontSiteController.js')

router.get('/front-site', frontSiteController.getAllData)
router.get('/front-site/:key', frontSiteController.getData);
// router.get('/contract-period/:house_id', contractController.getContractPeriod);
// router.post('/contract', contractController.createData);
// router.put('/contract-status/:id', contractController.updateContractStatus);
// router.put('/contract-time/:id', contractController.updateTimeData);
// router.put('/contract-progress/:id', contractController.updateContractProgress);
// router.delete('/contract/:id', contractController.deleteData);
// router.get('/contract-selection', contractController.getDropDown);
module.exports = router;