const express = require('express');
const router = express.Router();
const losingController = require('../Controllers/losingController.js')

router.get('/losing-home', losingController.getHomeData);
router.get('/losing', losingController.getAllData);
router.get('/losing/:key', losingController.getData);
router.get('/losing-full/:key', losingController.getFullLosing);


module.exports = router;