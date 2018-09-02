const express = require('express');
const router = express.Router();
const technicianController = require('../Controllers/technicianController.js')

router.get('/technician', technicianController.getAllData);
router.get('/technician/:key', technicianController.getData);
router.post('/technician', technicianController.createData);
router.put('/technician/:id', technicianController.updateData);
router.delete('/technician/:id', technicianController.deleteData);
router.get('/technician-selection', technicianController.getDropDown);
// router.get('/technician-duplicate', technicianController.checkDuplicate);
module.exports = router;