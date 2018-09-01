const helpers = require('../Libraries/helpers')
const workGroupModel = require('../Models/workGroupModel')

const getData = (req, res, next) => {
  let id = req.params.key
  let items = new workGroupModel(id)
  items.getData()
  .then((result) => {
    res.status(200).json(result[0])
  })
}

async function getAllData (req, res, next) {
  let items = new workGroupModel()
  let data = []
  items.name = req.query.main_search
  let total = await items.count()
  items.limit = req.query.limit
  items.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await items.getAllData()
  if (result) {
    let config = {
      header: [{name: 'หมวดงาน'}],
      show: ['name']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

async function createData (req, res, next) {
  let newItem = new workGroupModel()
  newItem.name = req.body.data.name
  let result = await newItem.save()
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  let item = new workGroupModel(req.params.id)
  item.name = req.body.data.name
  let result = await item.update()
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new workGroupModel(req.params.id)
  let result = await item.delete()
  res.status(200).json({})
}

const getDropDown = async (req, res, next) => {
  let model = new workGroupModel()
  let data = {}
  data = await model.getAllSelection()
  data = data.map(item => {
    return {
      key: item.id,
      value: `${item.name}`
    }
  })
  
  res.status(200).json(data)
}

module.exports.getData = getData
module.exports.getDropDown = getDropDown
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
// module.exports.getDetailById = getDetailById
// module.exports.getAllDataFromLosing = getAllDataFromLosing
// module.exports.checkDuplicate = checkDuplicate
