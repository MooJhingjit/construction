const helpers = require('../Libraries/helpers')
const workGroupModel = require('../Models/workGroupModel')
const workGroupDetail = require('./workGroupDetailController')

const getData = async (req, res, next) => {
  let id = req.params.key
  let items = new workGroupModel(id)
  let result = await items.getData()
  if (req.query.type === 'with-detail') {
    let houseId = req.query.houseId
    let groupId = result[0].id
    let detail = await workGroupDetail.getData(groupId, houseId)
    result[0].details = detail
  } else {
    result = result[0]
  }
  res.status(200).json(result)
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
  await workGroupDetail.deleteData(req.params.id)
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
