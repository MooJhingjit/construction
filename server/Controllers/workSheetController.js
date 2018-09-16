const helpers = require('../Libraries/helpers')
const workSheetModel = require('../Models/workSheetModel')
const workSheetDetail = require('./workSheetDetailController')

const getData = async (req, res, next) => {
  // let technicianId = req.params.technicianId
  let item = new workSheetModel()
  if (req.params.key !== 'all') {
    item.technician_id = req.params.key
  }
  item.project_id = req.query.project
  item.plan = req.query.plan
  let group = await item.getData()
  
  await Promise.all(
    group.map(async (item) => {
      item.lists = await workSheetDetail.getData(item.id)
    })
  )
  res.status(200).json(group)
}

async function getAllData (req, res, next) {
  // let items = new workSheetModel()
  // let data = []
  // items.name = req.query.main_search
  // let total = await items.count()
  // items.limit = req.query.limit
  // items.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  // let result = await items.getAllData()
  // if (result) {
  //   let config = {
  //     header: [{name: 'หมวดงาน'}],
  //     show: ['name']
  //   }
  //   data = helpers.prepareDataTable(result, total, config)
  // }
  // res.status(200).json(data)
}

async function createData (req, res, next) {
  // console.log(req.body)
  let obj = req.body.data
  let newItem = new workSheetModel()
  newItem.technician_id = obj.technician.key
  newItem.plan = obj.contract.plan
  newItem.work_group_id = obj.workGroup.key
  newItem.work_group_name = obj.workGroup.value
  newItem.project_id = obj.contract.project_id
  newItem.house_id = obj.contract.house_id
  let result = await newItem.save()
  await workSheetDetail.saveNewOne(result[0], obj.itemLists)
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  // let obj = req.body.data
  // await workSheetDetail.updateOleOne(obj.itemId)
  // res.status(200).json()
}

async function deleteData (req, res, next) {
  // let item = new workSheetModel(req.params.id)
  // let result = await item.delete()
  // await workGroupDetail.deleteData(req.params.id)
  // res.status(200).json({})
}


module.exports.getData = getData
// module.exports.getDropDown = getDropDown
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
