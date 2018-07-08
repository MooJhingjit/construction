// const util = require('util')
// const helpers = require('../Libraries/helpers')
const workOrderModel = require('../Models/workOrderModel')
const workOrderDetailModel = require('../Models/workOrderDetailModel')
const workOrderPreiodModel = require('../Models/workOrderPreiodModel')
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
      let workOrderPreiod = new workOrderPreiodModel()
      await Promise.all(
        orderLists.map( async (item) => {
          workOrderPreiod.work_order_time = item.work_order_time
          workOrderPreiod.order = item.order
          item.condition = await workOrderPreiod.getData()
        })
      )
      
      workOrder = workOrder[0]
      result = {
        id: workOrder.id,
        time: workOrder.time,
        order: workOrder.order,
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
          order: item.order,
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

  await Promise.all(
    workOrderLists.map( async (item) => {
      let newItem = new workOrderDetailModel()
      newItem.work_order_time = workOrder.time
      newItem.name = item.taskName
      newItem.order = item.order
      if (item.postOrder.length) {
        newItem.post_order = item.postOrder[0]
      }
      await updateCondition(item, workOrder.time, item.order)
      newItem.save()
    })
  )
  
  res.status(200).json({})
}

async function updateCondition (obj, time, order) {
  let condition = obj.condition
  await Promise.all(
    condition.map( async (item) => {
      if (item.house_id !== null) {
        let workOrderPreiod = new workOrderPreiodModel()
        if (item.id !== undefined) { // update
          workOrderPreiod.id = item.id
          workOrderPreiod.preiod = item.preiod
          workOrderPreiod.preiod_end = item.preiod_end
          workOrderPreiod.condition = item.condition
          await workOrderPreiod.update()
        } else { // insert
          workOrderPreiod.work_order_time = time
          workOrderPreiod.order = order
          workOrderPreiod.house_id = item.house_id
          workOrderPreiod.preiod = item.preiod
          workOrderPreiod.preiod_end = item.preiod_end
          workOrderPreiod.condition = item.condition
          await workOrderPreiod.save()
        }
      }
    })
  )
}

async function getWorkingTemplate () {
  let workOrderDetail = new workOrderDetailModel()
  let result = await workOrderDetail.getAllData() // order by is important
  return result
}

async function getWorkOrderPreiod (houseId) {
  let workOrderPreiod = new workOrderPreiodModel()
  workOrderPreiod.house_id = houseId
  let result = await workOrderPreiod.getDataByHouseId()
  return result
}

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.getWorkingTemplate = getWorkingTemplate
module.exports.getWorkOrderPreiod = getWorkOrderPreiod
