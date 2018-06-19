// const util = require('util')
const helpers = require('../Libraries/helpers')
const workOrderModel = require('../Models/workOrderModel')
const workOrderDetailModel = require('../Models/workOrderDetailModel')

async function getData (req, res, next) {
  let id = req.params.key
  let workOrder = new workOrderModel()
  workOrder.time = id
  // let itemDetailResult = []
  let result = []
  switch(req.query.type) {
    case 'full':
      workOrder = await workOrder.getData()
      let workOrderDetail = new workOrderDetailModel()
      workOrderDetail.work_order_time = workOrder[0].time
      let orderLists = await workOrderDetail.getData()
      workOrder = workOrder[0]
      result = {
        id: workOrder.id,
        time: workOrder.time,
        pre_order: workOrder.pre_order,
        lists: orderLists
      }
        break;
    default:
      result = await workOrder.getData()
  }
  res.status(200).json(result)
}

async function getAllData (req, res, next) {
  let workOrder = new workOrderModel()
  let data = []
  let result = await workOrder.getAllData()
  if (result) {
    result = await Promise.all(
      result.map(async (item) => {
        let workOrderDetial = new workOrderDetailModel()
        workOrderDetial.work_order_time = item.time
        detail = await workOrderDetial.getData()
        return {
          time: item.time,
          pre_order: item.pre_order,
          tasks: detail || [],
          created: item.created_at
        }
      })
    )
  }
  res.status(200).json(result)
}

async function createData (req, res, next) {
  let newItem = new workOrderModel()
  let total = await newItem.count()
  newItem.time = total[0].count + 1
  newItem.pre_order = 0
  let result = await newItem.save()
  res.status(200).json({time: newItem.time})
}

async function updateData (req, res, next) {
  let workOrder = new workOrderModel() // id == time
  workOrder.time = req.body.data.time
  if (req.body.data.pre_order.length) {
    workOrder.pre_order = req.body.data.pre_order[0]
  }
  await workOrder.update()
  let oldItem = new workOrderDetailModel()
  oldItem.work_order_time = workOrder.time
  await oldItem.delete()
  let workOrderLists = req.body.data.workOrderLists
  workOrderLists.map(item => {
    let newItem = new workOrderDetailModel()
    newItem.work_order_time = workOrder.time
    newItem.name = item.taskName
    if (item.postOrder.length) {
      newItem.post_order = item.postOrder[0]
    }
    // // newItem.delay = item.delay
    newItem.save()
  })
  res.status(200).json({})
}


// async function deleteData (req, res, next) {
//   let newItem = new projectModel(req.params.id)
//   let result = await newItem.delete()
//   res.status(200).json({})
// }

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
// module.exports.deleteData = deleteData