// const helpers = require('../Libraries/helpers')
const workOrderModel = require('../Models/workOrderModel')
const materialGroup = require('./materialGroupController.js')
const workOrderDetailModel = require('../Models/workOrderDetailModel.js')
const materialController = require('./materialController.js')

async function prepareOrdering (houseId, taskOrder) {
  let materialGroupId = await getOrderGroup(taskOrder)
  let materials = await materialGroup.getMaterialByGroup(materialGroupId, houseId)
  let materialIdArr = getMaterialIdArr(materials)
  let fullMaterial = await materialController.getMaterialDetail(materialIdArr)
  await orderMaterial(fullMaterial)
}
async function getOrderGroup (taskOrder) {
  let workOrderDetail = new workOrderDetailModel()
  workOrderDetail.order = taskOrder
  workOrderDetail = await workOrderDetail.getPostOrder()
  let orderGroup = null
  orderGroup = workOrderDetail[0].post_order
  return orderGroup
}

async function orderMaterial (fullMaterial) {
  console.log(fullMaterial)
  // order material
  // material.map((item) => {})
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