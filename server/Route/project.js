const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController.js')

router.get('/project', projectController.getAllData);
router.get('/project/:key', projectController.getData);
router.post('/project', projectController.create);
router.put('/project/:id', projectController.update);
router.delete('/project/:id', projectController.delete);
module.exports = router;