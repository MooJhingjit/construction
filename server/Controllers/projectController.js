// const util = require('util')
const helpers = require('../Libraries/helpers')
const projectModel = require('../Models/projectModel')

const getData = (req, res, next) => {
  // let userData = helpers.getUserAuth(req.headers['authorization'])
  let id = req.params.key
  let project = new projectModel(id)
  project.getData()
  .then((result) => {
    res.status(200).json(result[0])
  })
}

async function getAllData (req, res, next) {
  let project = new projectModel()
  let data = []
  project.status = req.query.status
  project.name = req.query.main_search
  let total = await project.count()
  project.limit = req.query.limit
  project.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await project.getAllData()
  if (result) {
    let config = {
      header: [{name: 'รหัส'}, {name: 'ชื่อโครงการ'}],
      show: ['code', 'name']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

async function createData (req, res, next) {
  // console.log(req.body.na)
  let newItem = new projectModel()
  newItem.code= req.body.data.code
  newItem.name = req.body.data.name
  newItem.address = req.body.data.address
  newItem.type = req.body.data.type
  let result = await newItem.save()
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  // console.log(req.body.na)
  let item = new projectModel(req.params.id)
  item.code= req.body.data.code
  item.name = req.body.data.name
  item.address = req.body.data.address
  item.type = req.body.data.type
  let result = await item.update()
  // console.log(result)
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new projectModel(req.params.id)
  let result = await item.delete()
  res.status(200).json({})
}

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData