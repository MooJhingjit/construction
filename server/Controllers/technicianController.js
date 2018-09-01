const helpers = require('../Libraries/helpers')
const technicianModel = require('../Models/technicianModel')

const getData = (req, res, next) => {
  let id = req.params.key
  let items = new technicianModel(id)
  items.getData()
  .then((result) => {
    res.status(200).json(result[0])
  })
}

async function getAllData (req, res, next) {
  let items = new technicianModel()
  let data = []
  items.name = req.query.main_search
  let total = await items.count()
  items.limit = req.query.limit
  items.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await items.getAllData()
  if (result) {
    let config = {
      header: [{name: 'ชื่อ'}, {name: 'เบอร์โทรศัพท์'}],
      show: ['name', 'phone']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

async function createData (req, res, next) {
  let newItem = new technicianModel()
  newItem.name = req.body.data.name
  newItem.phone = req.body.data.phone
  newItem.jobType= req.body.data.jobType
  let result = await newItem.save()
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  let item = new technicianModel(req.params.id)
  item.name = req.body.data.name
  item.phone = req.body.data.phone
  item.jobType= req.body.data.jobType
  let result = await item.update()
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new technicianModel(req.params.id)
  let result = await item.delete()
  res.status(200).json({})
}

const getDropDown = async (req, res, next) => {
  let model = new technicianModel()
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
