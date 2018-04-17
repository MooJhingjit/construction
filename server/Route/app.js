const express = require('express');
const router = express.Router();
const appController = require('../Controllers/appController.js')

router.get('/app/resource', appController.getAppResource);
module.exports = router;