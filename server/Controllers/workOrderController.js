// const util = require('util')
// const helpers = require('../Libraries/helpers')
const projectController = require('./projectController')
const workOrderModel = require('../Models/workOrderModel')
const workOrderDetailModel = require('../Models/workOrderDetailModel')
const workOrderPreiodModel = require('../Models/workOrderPreiodModel')
async function getData (req, res, next) {
  let id = req.params.key
  let workOrder = new workOrderModel()
  workOrder.id = id
  // let itemDetailResult = []
  let result = []
  switch(req.query.type) {
    case 'full':
      workOrder = await workOrder.getAllData()
      // console.log(workOrder)
      // console.log(workOrder[0].time)
      let workOrderDetail = new workOrderDetailModel()
      workOrderDetail.work_order_id = id
      let orderLists = await workOrderDetail.getData()
      // console.log(orderLists)
      let workOrderPreiod = new workOrderPreiodModel()
      await Promise.all(
        orderLists.map( async (item) => {
          workOrderPreiod.work_order_detail_id = item.id
          // console.log(item.id)
          // workOrderPreiod.work_order_time = workOrder[0].time
          // workOrderPreiod.order = item.order
          item.condition = await workOrderPreiod.getData()
        })
      )
      workOrder = workOrder[0]
      let project = await projectController.getProjectTypeById(workOrder.project_type_id)
      // console.log(orderLists)
      result = {
        id: workOrder.id,
        time: workOrder.time,
        order: workOrder.order,
        project,
        // pre_order: workOrder.pre_order,
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
  workOrder.project_type_id = req.query.projectType
  let result = await workOrder.getAllData()
  // console.log(result)
  if (result) {
    result = await Promise.all(
      result.map(async (item) => {
        let workOrderDetial = new workOrderDetailModel()
        workOrderDetial.work_order_id = item.id
        // workOrderDetial.work_order_time = item.time
        detail = await workOrderDetial.getData()
        return {
          id: item.id,
          time: item.time,
          order: item.order,
          // pre_order: item.pre_order,
          tasks: detail || [],
          created: item.created_at
        }
      })
    )
  }
  res.status(200).json(result)
}

async function createData (req, res, next) {
  let item = new workOrderModel()
  item.project_type_id = req.body.data.projectType
  let total = await item.count()
  item.time = total[0].count + 1
  let newId = await item.save()
  res.status(200).json({id: newId})
}

async function updateData (req, res, next) {
  // let workOrder = new workOrderModel() // id == time
  // workOrder.time = req.body.data.time
  // if (req.body.data.pre_order.length) {
  //   workOrder.pre_order = req.body.data.pre_order[0]
  // }
  // await workOrder.update()
  
  let oldItem = new workOrderDetailModel()
  oldItem.work_order_id = req.params.id
  await oldItem.delete()
  let workOrderLists = req.body.data.workOrderLists

  await Promise.all(
    workOrderLists.map( async (item) => {
      let newItem = new workOrderDetailModel()
      newItem.work_order_id = req.params.id
      // newItem.work_order_time = workOrder.time
      newItem.order = item.order
      newItem.name = item.taskName
      if (item.postOrder.length) {
        newItem.post_order = item.postOrder[0]
      }
      let work_order_detail_id = await newItem.save()
      // console.log(work_order_detail_id)
      await updateCondition(item, work_order_detail_id)
    })
  )
  
  res.status(200).json({})
}

async function updateCondition (obj, work_order_detail_id) {
  let condition = obj.condition
  await Promise.all(
    condition.map( async (item) => {
      if (item.house_id !== null) {
        let workOrderPreiod = new workOrderPreiodModel()
        if (item.id !== undefined) { // update
          workOrderPreiod.id = item.id
          workOrderPreiod.work_order_detail_id = work_order_detail_id
          workOrderPreiod.preiod = item.preiod
          workOrderPreiod.preiod_end = item.preiod_end
          workOrderPreiod.condition = item.condition === '' || item.condition === null ? null : item.condition
          await workOrderPreiod.update()
        } else { // insert
          // workOrderPreiod.work_order_time = time
          // workOrderPreiod.order = order
          workOrderPreiod.work_order_detail_id = work_order_detail_id
          workOrderPreiod.house_id = item.house_id
          workOrderPreiod.preiod = item.preiod
          workOrderPreiod.preiod_end = item.preiod_end
          workOrderPreiod.condition = item.condition === '' || item.condition === null ? null : item.condition
          await workOrderPreiod.save()
        }
      }
    })
  )
}

async function getWorkingTemplate (projectTypeId) {
  let workOrderDetail = new workOrderDetailModel()
  let result = await workOrderDetail.getTemplateData(projectTypeId) // order by is important
  return result
}
async function getWorkOrderPreiod (houseId) {
  let workOrderPreiod = new workOrderPreiodModel()
  workOrderPreiod.house_id = houseId
  let result = await workOrderPreiod.getDataByHouseId()
  return result
}

// async function getTimeById (workOrderId) {
//   let work = new workOrderModel()
//   workOrderPreiod.house_id = houseId
//   let result = await workOrderPreiod.getDataByHouseId()
//   return result
// }

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.getWorkingTemplate = getWorkingTemplate
module.exports.getWorkOrderPreiod = getWorkOrderPreiod
