// const helpers = require('../Libraries/helpers')
const orderingModel = require('../Models/orderingModel')
const orderingDetailModel = require('../Models/orderingDetailModel')
const materialGroup = require('./materialGroupController.js')
const workOrderDetailModel = require('../Models/workOrderDetailModel.js')
const materialController = require('./materialController.js')

async function prepareOrdering (houseId, taskOrder, time) {
  let orderGroupId = await getOrderGroup(taskOrder, time)
  let materials = await materialGroup.getMaterialByGroup(orderGroupId, houseId)
  let materialIdArr = getMaterialIdArr(materials)
  let fullMaterial = await materialController.getMaterialDetail(materialIdArr)
  await prepareMaterial(fullMaterial)
}
async function getOrderGroup (taskOrder, time) {
  let workOrderDetail = new workOrderDetailModel()
  workOrderDetail.order = taskOrder
  workOrderDetail.work_order_time = time
  workOrderDetail = await workOrderDetail.getPostOrder()
  let orderGroupId = null
  orderGroupId = workOrderDetail[0].post_order
  return orderGroupId
}

async function prepareMaterial (materials) {
  if (materials.length) {
    let order = []
    let orderDetail = []
    materials.map((item) => {
      orderDetail[item.store_id] = []
      order = []
    })
    materials.map((item) => {
      orderDetail[item.store_id].push({
        name: item.name,
        price: item.price,
        amount: item.amount,
        status: 'wait'
      })
    })
    orderDetail.map((storeData, storeId) => {
      let data = {}
      data.store_id = storeId
      data.total_price = 0
      data.amount = storeData.length
      data.contractCode = null
      data.dateStart = null
      data.status = 'received'
      storeData.map((materials) => {
        data.total_price += materials.price
      })
      data.detail = orderDetail[storeId]
      order.push(data)
    })
    orderMaterial(order)
  }
}
async function orderMaterial (order) {
  await Promise.all(
    order.map( async (item) => {
      let newItem = new orderingModel()
      newItem.store_id = item.store_id
      newItem.total_price = item.total_price
      newItem.amount = item.amount
      newItem.contractCode = item.contractCode
      newItem.dateStart = item.dateStart
      newItem.status = item.status
      let orderId = await newItem.save()
      item.detail.map( async (itemDetail) => {
        let detailItem = new orderingDetailModel()
        detailItem.order_id = orderId[0]
        detailItem.name = itemDetail.name
        detailItem.price = itemDetail.price
        detailItem.amount = itemDetail.amount
        detailItem.status = itemDetail.status
        await detailItem.save()
      })
    })
  )
}

function getMaterialIdArr (materials) {
  let materialArr = []
  materials.map(item => {
    materialArr.push(item.material_id)
  })

  return materialArr
}

module.exports.prepareOrdering = prepareOrdering
module.exports.orderMaterial = orderMaterial