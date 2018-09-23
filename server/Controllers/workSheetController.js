const helpers = require('../Libraries/helpers')
const workSheetModel = require('../Models/workSheetModel')
const workSheetDetail = require('./workSheetDetailController')

const getData = async (req, res, next) => {
  // let technicianId = req.params.technicianId
  let item = new workSheetModel()
  let result = null
  if (req.params.key !== 'all') {
    item.technician_id = req.params.key
  }
  if (req.params.key === 'approval') {
    let project = req.query.project
    result = await getDataForApproval(project)
  } else {
    item.project_id = req.query.project
    item.plan = req.query.plan
    result = await item.getData()
    
    await Promise.all(
      result.map(async (item) => {
        item.lists = await workSheetDetail.getData(item.id)
      })
    )
  }
  
  res.status(200).json(result)
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
  // console.log(req.body.data.workGroup)
  // console.log('---------------------')
  // console.log(req.body.data.itemLists)
  // res.status(200).json({})
  let obj = req.body.data
  let isExtra = 0
  let newItem = new workSheetModel()
  newItem.technician_id = obj.technician.key
  newItem.plan = obj.contract.plan
  newItem.work_group_id = obj.workGroup.key
  newItem.work_group_name = obj.workGroup.value
  newItem.project_id = obj.contract.project_id
  newItem.house_id = obj.contract.house_id
  newItem.is_extra = 0
  if (obj.workGroup.isExtra) {
    newItem.is_extra = 1
  }
  let result = await newItem.save()
  await workSheetDetail.saveNewOne(result[0], obj.itemLists, newItem.is_extra)
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  // let obj = {
  //   status: req.body.data.status
  // }
  let obj = req.body.data.item
  if (req.body.data.updateType === 'update-status') {
    if (obj.status === '4') {
      obj.has_rejected = 1
    }
    await workSheetDetail.updateOldOne(req.params.id, obj)
  }
  res.status(200).json()
}

async function deleteData (req, res, next) {
  // let item = new workSheetModel(req.params.id)
  // let result = await item.delete()
  // await workGroupDetail.deleteData(req.params.id)
  // res.status(200).json({})
}

async function getDataForApproval (projectId) {
  let approvalData = new workSheetModel()
  approvalData.project_id = projectId
  let obj = await approvalData.getApprovalData()
  let result = []
  if (obj) {
    for (key in obj) {
      if (!result[obj[key].technician_id]) {
        result[obj[key].technician_id] = []
      }
      result[obj[key].technician_id].push(obj[key])
    }
    result = result.filter((item) => {
      return item !== null
    })
  }
  return result
}


module.exports.getData = getData
// module.exports.getDropDown = getDropDown
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
