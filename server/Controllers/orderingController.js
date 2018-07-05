const helpers = require('../Libraries/helpers')
const contract = require('./contractController.js')
const orderingModel = require('../Models/orderingModel')
const materialGroup = require('./materialGroupController.js')
const materialController = require('./materialController.js')
const orderingDetailModel = require('../Models/orderingDetailModel')
const workOrderDetailModel = require('../Models/workOrderDetailModel.js')

async function getResource (req, res, next) {
  let orderingNormal = await prepareChartData('normal')
  let orderingExtra = await prepareChartData('extra')
  let data = {
    ordering: {
      normal: [],
      extra: []
    },
    chart: {
      normal: {
        labels: orderingNormal.date,
        // labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การสั่งซื้อ',
            backgroundColor: '#F7894E',
            data: orderingNormal.data
            // data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31]
          }
        ]
      },
      extra: {
        labels: orderingExtra.date,
        // labels: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
        datasets: [
          {
            label: 'การสั่งซื้อ (พิเศษ)',
            backgroundColor: '#F05858',
            data: orderingExtra.data
            // data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31]
          }
        ]
      }
    }
  }
  data.ordering.normal = await getLastOrder('normal')
  data.ordering.extra = await getLastOrder('extra')
  res.status(200).json(data)
}
const getLastOrder = async (orderType) => {
  let ordering = new orderingModel()
  ordering.order_type = orderType
  let res = await ordering.getLastOrderByType()
  return res
}
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
async function createExtraData (req, res, next) {
  let materials = req.body.data.materials.map((item) => {
    return {
      material_id: item.obj.key,
      amount: item.amount
    }
  })
  let materialIdArr = getMaterialIdArr(materials)
  let fullMaterial = await materialController.getMaterialDetail(materialIdArr)
  await prepareMaterial(req.body.data.contract, fullMaterial, {materials, note: req.body.data.note}) // materials is extra
  res.status(200).json({})
}
async function updateData (req, res, next) {
  let ordering = req.body.data
  await Promise.all(
    ordering.map( async (item) => {
      let ordering = new orderingModel(item.id)
      ordering.status = item.status
      let price = await updateOrderDetail(item.orderDetail)
      ordering.total_price = price
      await ordering.update()
    })
  )
  res.status(200).json({})
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
async function prepareMaterial (contractCode, materials, extraObj = null) {
  // extraObj = {materials, note}
  if (materials.length) {
    let order = []
    let orderDetail = []
    materials.map((item) => {
      orderDetail[item.store_id] = []
      order = []
    })
    materials.map((item) => {
      if (extraObj != null) {
        item.amount = extraObj.materials.map((extraItem) => {
          if (extraItem.material_id == item.id) {
            return extraItem.amount
          }
        })
      }
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
      data.note = (extraObj != null) ? extraObj.note : ''
      data.order_type = (extraObj != null) ? 'extra' : 'normal'
      storeData.map((materials) => {
        data.total_price += materials.price * materials.amount
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
      newItem.contract_code = item.contractCode
      newItem.dateStart = item.dateStart
      newItem.status = item.status
      newItem.order_type = item.order_type
      newItem.note = item.note
      let orderId = await newItem.save()
      item.detail.map( async (itemDetail) => {
        let detailItem = new orderingDetailModel()
        detailItem.order_id = orderId[0]
        detailItem.name = itemDetail.name
        detailItem.price = itemDetail.price * itemDetail.amount
        detailItem.unit_price = itemDetail.price
        detailItem.amount = itemDetail.amount
        detailItem.status = itemDetail.status
        await detailItem.save()
      })
    })
  )
}
const getMaterialIdArr = (materials) => {
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
const updateOrderDetail = async (data) => {
  let price = 0
  await Promise.all(
    data.map( async (itemDetail) => {
      let orderingDetail = new orderingDetailModel(itemDetail.id)
      orderingDetail.amount = itemDetail.amount
      orderingDetail.price = parseFloat(itemDetail.price)
      await orderingDetail.update()
      price += parseFloat(itemDetail.price)
    })
  ) 
  return price
}
const prepareChartData = async (type) => {
  let ordering = new orderingModel()
  ordering.order_type = type
  let orderingRes = await ordering.getStat()

  let stat = []
  orderingRes.map((item) => {
    let date = helpers.getDate(item.created_at, 'YYYY-MM-DD')
    if (stat[date]) {
      stat[date] +=  1
    } else {
      stat[date] = 1
    }
  })
  let dataSets = {
    date: [],
    data: []
  }
  for (key in stat) {
    dataSets.date.push(key)
    dataSets.data.push(stat[key])
  }
  return dataSets
}

module.exports.getResource = getResource
module.exports.getAllData = getAllData
module.exports.getData = getData
module.exports.updateData = updateData
module.exports.createExtraData = createExtraData
module.exports.prepareOrdering = prepareOrdering
module.exports.orderMaterial = orderMaterial
module.exports.prepareChartData = prepareChartData
