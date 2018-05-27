// const util = require('util')
const helpers = require('../Libraries/helpers')
const storeModel = require('../Models/storeModel')
const materialModel = require('../Models/materialModel')

async function getData (req, res, next) {
  let id = req.params.key
  let store = new storeModel(id)
  let result = await store.getData()
  res.status(200).json(result[0])
}

async function getAllData (req, res, next) {
  let store = new storeModel()
  let data = []
  store.status = req.query.status
  store.name = req.query.main_search
  let total = await store.count()
  store.limit = req.query.limit
  store.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await store.getAllData()
  if (result) {
    let config = {
      header: [{name: 'ชื่อร้าน'}, {name: 'ประเภท'}],
      show: ['name', 'type']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

async function createData (req, res, next) {
  // console.log(req.body.na)
  let newItem = new storeModel()
  newItem.name = req.body.data.name
  newItem.type = req.body.data.type
  newItem.contact = req.body.data.contact
  newItem.fax = req.body.data.fax
  newItem.tel = req.body.data.tel
  newItem.address = req.body.data.address
  let result = await newItem.save()
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  // console.log(req.body.na)
  let item = new storeModel(req.params.id)
  item.name = req.body.data.name
  item.type = req.body.data.type
  item.contact = req.body.data.contact
  item.fax = req.body.data.fax
  item.tel = req.body.data.tel
  item.address = req.body.data.address
  let result = await item.update()
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new storeModel(req.params.id)
  await item.delete()
  let material = new materialModel()
  material.store_id = req.params.id
  let materials = await material.getDataByAttr()
  let materialId = []
  materials.forEach(element => {
    materialId.push(element.id)
  })
  await material.clearMaterial([]) // not in
  await material.clearMaterialDetail(materialId)
  res.status(200).json({})
}

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData