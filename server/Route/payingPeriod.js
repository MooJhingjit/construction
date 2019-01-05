const express = require('express');
const router = express.Router();
const payingPeriodController = require('../Controllers/payingPeriodController.js')

router.get('/paying-period', payingPeriodController.getData);
router.get('/paying-period/summary', payingPeriodController.getSummary);
module.exports = router;