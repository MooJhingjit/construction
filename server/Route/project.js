const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController.js')

router.get('/project', projectController.getAllData);
router.get('/project/:key', projectController.getData);
router.post('/project', projectController.createData);
router.put('/project/:id', projectController.updateData);
router.delete('/project/:id', projectController.deleteData);
router.get('/project-selection', projectController.getDropDown);
module.exports = router;