const helpers = require('../Libraries/helpers')
const contract = require('./contractController.js')
const orderingModel = require('../Models/orderingModel')
const materialGroup = require('./materialGroupController.js')
const materialController = require('./materialController.js')
const orderingDetailModel = require('../Models/orderingDetailModel')
const workOrderDetailModel = require('../Models/workOrderDetailModel.js')

async function getData (req, res, next) {
  let contractRes = await contract.getDetailByContractCode(['project', 'contract'], req.params.contractCode)
  let ordering = await getDetailByContractCode(req.params.contractCode)
  contractRes.ordering = ordering
  res.status(200).json(contractRes)
}

async function getAllData (req, res, next) {
  let ordering = new orderingModel()
  let data = []
  if (req.query.status) {
    if (req.query.status === 'normal' || req.query.status === 'extra') {
      ordering.order_type = req.query.status
    } else {
      ordering.status = req.query.status
    }
  }
  let total = await ordering.count()
  ordering.limit = req.query.limit
  ordering.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await ordering.getAllData()
  if (result) {
    let config = {
      header: [{name: 'เลขที่สัญญา'}, {name: 'ประเภท'}, {name: 'สถานะ'}],
      show: ['contract_code', 'order_type', 'status']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}
async function prepareOrdering (contractCode, houseId, taskOrder, time) {
  let orderGroupId = await getOrderGroup(taskOrder, time)
  let materials = await materialGroup.getMaterialByGroup(orderGroupId, houseId)
  let materialIdArr = getMaterialIdArr(materials)
  let fullMaterial = await materialController.getMaterialDetail(materialIdArr)
  await prepareMaterial(contractCode, fullMaterial)
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
async function prepareMaterial (contractCode, materials) {
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
      data.contractCode = contractCode
      data.dateStart = null
      data.status = 'wait'
      data.order_type = 'normal'
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
  console.log(order)
  await Promise.all(
    order.map( async (item) => {
      let newItem = new orderingModel()
      newItem.store_id = item.store_id
      newItem.total_price = item.total_price
      newItem.amount = item.amount
      newItem.contract_code = item.contractCode
      newItem.dateStart = item.dateStart
      newItem.status = item.status
      newItem.order_type = item.order_type
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
const getDetailByContractCode = async (code) => {
  let ordering = new orderingModel()
  ordering.contract_code = code
  let orderingRes = await ordering.getData()
  await Promise.all(
    orderingRes.map( async (item) => {
      let orderDetail = new orderingDetailModel()
      orderDetail.order_id = item.id
      let orderDetailRes = await orderDetail.getData()
      item.orderDetail = orderDetailRes
    })
  )
  return orderingRes
  
}

module.exports.getAllData = getAllData
module.exports.getData = getData
module.exports.prepareOrdering = prepareOrdering
module.exports.orderMaterial = orderMaterial