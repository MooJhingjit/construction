const express = require('express')
const router = express.Router()
const materialController = require('../Controllers/materialController.js')

// router.get('/material', materialController.getAllData);
router.get('/material/:key', materialController.getFullMaterial)
router.get('/material-selection', materialController.getDropDown)
router.post('/material', materialController.createData)
// router.put('/material/:id', materialController.updateData)
router.delete('/material', materialController.deleteData)
// router.delete('/material/:id', materialController.deleteData)
module.exports = router