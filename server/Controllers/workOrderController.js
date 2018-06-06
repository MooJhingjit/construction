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
      result = await workOrder.getData()
      result = result.map(item => {
        let material_group = []
        if (item.material_group_id) {
          material_group.push({
            id: item.material_group_id,
            name: item.material_group_name
          })
        }
        return {
          time: item.time,
          pre_order: item.pre_order,
          // // delay: item.delay,
          work_order_date: item.work_order_date,
          name: item.name,
          post_order: item.post_order,
          work_order_detail_date: item.work_order_detail_date,
          material_group: material_group
        }
      })
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
        let workOrderDetial = new workOrderModel()
        workOrderDetial.time = item.time
        detail = await workOrderDetial.getData()
        return {
          time: item.time,
          pre_order: item.pre_order,
          tasks: detail || null,
          created: item.created_at
        }
      })
    )
    // result = result.map(item => {
    //   let workOrderDetial = new workOrderModel()
    //   workOrderDetial.time = item.time
    //   detail = await workOrderDetial.getData()
    //   console.log(detail)
    //   return {
    //     time: item.time,
    //     pre_order: item.pre_order,
    //     tasks: detail || null,
    //     created: item.created_at
    //   }
    // })
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
    workOrder.pre_order = req.body.data.pre_order[0].id
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
      newItem.post_order = item.postOrder[0].id
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