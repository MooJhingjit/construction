const helpers = require('../Libraries/helpers')
const contract = require('./contractController.js')
const projectController = require('./projectController.js')
const houseController = require('./houseController.js')
const storeController = require('./storeController.js')
const materialController = require('./materialController.js')
const orderingModel = require('../Models/orderingModel')
const materialGroup = require('./materialGroupController.js')
const orderingDetailModel = require('../Models/orderingDetailModel')
const workOrderDetailModel = require('../Models/workOrderDetailModel.js')
const scheduleModel = require('../Models/nodeScheduleModel.js')


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
            backgroundColor: 'rgba(255,146,146,.7)',
            data: orderingExtra.data
            // data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31]
          }
        ]
      }
    }
  }
  data.ordering = await getLastOrder()
  res.status(200).json(data)
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
  ordering.contract_code = req.query.contract_search
  let total = await ordering.count()
  ordering.limit = req.query.limit
  ordering.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await ordering.getAllData()
  if (result) {
    let config = {
      header: [{name: 'เลขที่สัญญา'}, {name: 'จำนวนรายการ'}],
      show: ['contract_code', 'amount']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}
async function createExtraData (req, res, next) {
  let project = req.body.data.project
  let materials = req.body.data.materials.map((item) => {
    return {
      material_id: item.obj.key,
      amount: item.amount
    }
  })
  let materialIdArr = getMaterialIdArr(materials)
  let fullMaterial = await materialController.getMaterialDetail(materialIdArr)
  let houseDetail = []
  await prepareMaterial(req.body.data.contract, fullMaterial, null, project.typeId, houseDetail, {materials, note: req.body.data.note}) // materials is extra
  // let orderingData = await countOrdering()
  res.status(200).json({})
}
async function deleteData (req, res, next) {
  let item = new orderingModel(req.params.id)
  await item.delete()
  let detailItem = new orderingDetailModel()
  detailItem.order_id = req.params.id
  await detailItem.delete()
  // let orderingData = await countOrdering()
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
      ordering.date_start = helpers.getCurrentDate('YYYY-MM-DD')
      await ordering.update()
    })
  )
  // let orderingData = await countOrdering()
  res.status(200).json({})
}

async function countOrderingData (req, res, next) {
  let ordering = new orderingModel()
  ordering.status = 'wait'
  let orderingObj = await ordering.getOrderRemainingCount('normal')
  // let extra = await  ordering.getOrderRemainingCount('extra')
  let contarctObj = {}
  orderingObj.map((item) => {
    if (contarctObj[item.project_type_id] !== undefined) {
      let newNormal = contarctObj[item.project_type_id].normal + parseInt((item.order_type === 'normal') ? item.amount : 0)
      let newExtra = contarctObj[item.project_type_id].extra + parseInt((item.order_type === 'extra') ? item.amount : 0)
      contarctObj[item.project_type_id] = {
        projectTypeName: item.project_type_name,
        normal: newNormal,
        extra: newExtra
      }
    } else {
      contarctObj[item.project_type_id] = {
        projectTypeName: item.project_type_name,
        normal: (item.order_type === 'normal') ? item.amount : 0,
        extra: (item.order_type === 'extra') ? item.amount : 0
      }
    }
  })
  res.status(200).json(contarctObj)
}

const getLastOrder = async () => {
  let ordering = new orderingModel()
  let res = await ordering.getOrderRemainingList()
  let orderingObj = {}
  res.map((item) => {
    if (orderingObj[item.order_type] !== undefined && orderingObj[item.order_type][item.contract_code]  !== undefined) {
      let newAmount = orderingObj[item.order_type][item.contract_code].amount + item.amount
      let newTotalPrice = orderingObj[item.order_type][item.contract_code].totalPrice + item.total_price
      orderingObj[item.order_type][item.contract_code] = {
        projectTypeName: item.project_type_name,
        contractCode: item.contract_code,
        amount: newAmount,
        totalPrice: newTotalPrice,
      }
    } else {
      if (orderingObj[item.order_type] === undefined) {
        orderingObj[item.order_type] = {
          [item.contract_code]: {
            projectTypeName: item.project_type_name,
            contractCode: item.contract_code,
            amount: item.amount,
            totalPrice: item.total_price,
          }
        }
      }
      if (orderingObj[item.order_type][item.contract_code] === undefined) {
        orderingObj[item.order_type][item.contract_code] = {
          projectTypeName: item.project_type_name,
          contractCode: item.contract_code,
          amount: item.amount,
          totalPrice: item.total_price
        }
      }
      
    }
  })
  return {
    normal: orderingObj.normal || {},
    extra: orderingObj.extra || {}
  }
}

async function prepareOrdering (contractCode, houseId, taskOrder, time, progressId, projectTypeId, plan) {
  // console.log('------------prepareOrdering-----------------')
  // console.log(contractCode)
  // console.log('-----------------------------')
  // console.log(houseId)
  // console.log('-----------------------------')
  // console.log(taskOrder)
  // console.log('-----------------------------')
  // console.log(time)
  // console.log('-----------------------------')
  // console.log(progressId)
  // console.log('-----------------------------')
  // console.log(projectTypeId)
  // console.log('-----------end--prepareOrdering----------------')

  let orderGroupId = await getOrderGroup(taskOrder, time, projectTypeId)
  let materials = await materialGroup.getMaterialByGroup(orderGroupId, houseId)
  // console.log('------------getOrderGroup-----------------')
  // console.log('orderGroupId => *******' + orderGroupId)
  // console.log('-----------------------------')
  // console.log(materials)
  // console.log('-----------end--getOrderGroup----------------')
  let materialIdArr = getMaterialIdArr(materials)
  let fullMaterial = await materialController.getMaterialDetail(materialIdArr)
  let houseDetail = await houseController.getDataByName(plan, projectTypeId)
  await prepareMaterial(contractCode, fullMaterial, progressId, projectTypeId, houseDetail)
}
async function getOrderGroup (taskOrder, time, projectTypeId) {
  let workOrderDetail = new workOrderDetailModel()
  workOrderDetail.order = taskOrder
  workOrderDetail = await workOrderDetail.getPostOrder(projectTypeId, time)
  let orderGroupId = null
  orderGroupId = workOrderDetail[0].post_order
  return orderGroupId
}
async function prepareMaterial (contractCode, materials, progressId, projectTypeId, houseDetail, extraObj = null) {
  // extraObj = {materials, note}
  // console.log(materials)
  if (materials.length) {
    let order = []
    let orderDetail = []
    materials.map((item) => {
      orderDetail[item.store_id] = []
      order = []
    })
    materials.map((item) => {
      let realAmount = item.amount

      if (extraObj != null) {
        extraObj.materials.map((extraItem) => {
          if (extraItem.material_id == item.id) {
            // item.amount = extraItem.amount
            realAmount = extraItem.amount
          }
        })
      }
      // find amount for material
      // let allQuantity = item.quantity
      console.log(houseDetail)
      // console.log('-------------')
      // console.log(item.quantity)
      if (item.quantity.length && houseDetail.length && extraObj === null) {
        // console.log(houseDetail) // <-------------------- have to get plan as well
        let side = houseDetail[0].garage // can be change to stair
        let color = houseDetail[0].color
        // console.log(side)
        // console.log(color)
        item.quantity.map((quantityItem) => {
          // console.log(quantityItem)
          if (quantityItem.side === side && quantityItem.color === color && quantityItem.price) {
            realAmount = quantityItem.price // price means amount
          }
          // console.log(amountIItem) 
        })
      }
      orderDetail[item.store_id].push({ // <--- 1 push something here if want to edit orderDetail
        
        name: item.name,
        price: item.price,
        unitText: item.unit,
        amount: realAmount,
        delay: item.delay
      })
    })
    
    let currentDate = helpers.getCurrentDate('YYYY-MM-DD')
    orderDetail.map((storeData, storeId) => {
      startDate = currentDate
      let data = {}
      let status = 'wait'
      if (storeData[0].delay && extraObj === null) {
        status = 'pending'
        // console.log(startDate)
        startDate = helpers.addDate(startDate, storeData[0].delay, 'YYYY-MM-DD')
        // console.log('add ' + storeData[0].delay + 'day = ' + startDate)
      }
      data.store_id = storeId
      data.total_price = parseFloat(0)
      data.amount = storeData.length
      data.contractCode = contractCode
      data.dateStart = startDate
      data.status = status
      data.note = (extraObj != null) ? extraObj.note : ''
      data.order_type = (extraObj != null) ? 'extra' : 'normal'
      
      storeData.map((materials) => {
        let price = parseFloat(materials.price)
        let amount = parseFloat(materials.amount)
        data.total_price += price * amount
      })
      data.detail = orderDetail[storeId]
      order.push(data)
    })
   
    orderMaterial(order, progressId, projectTypeId)
  }
}
async function orderMaterial (order, progress_id, projectTypeId) {
  await Promise.all(
    order.map( async (item) => {
      let newItem = new orderingModel()
      newItem.store_id = item.store_id
      newItem.projectTypeId = projectTypeId
      newItem.progress_id = progress_id
      newItem.total_price = item.total_price
      newItem.amount = item.amount
      newItem.contract_code = item.contractCode
      newItem.date_start = item.dateStart
      newItem.status = item.status
      newItem.order_type = item.order_type
      newItem.note = item.note
      let orderId = await newItem.save()
      item.detail.map( async (itemDetail) => { // <--- 2 push something here if want to edit orderDetail
        // console.log(itemDetail.amount)
        let detailItem = new orderingDetailModel()
        detailItem.order_id = orderId[0]
        detailItem.name = itemDetail.name
        detailItem.price = itemDetail.price * itemDetail.amount
        detailItem.unit_price = itemDetail.price
        detailItem.unit_text = itemDetail.unitText
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
const getDetailByContractCode = async (code, withDetail = true) => {
  let ordering = new orderingModel()
  ordering.contract_code = code
  let orderingRes = await ordering.getData()
  if (withDetail) {
    await Promise.all(
      orderingRes.map( async (item) => {
        let orderDetail = new orderingDetailModel()
        orderDetail.order_id = item.id
        let orderDetailRes = await orderDetail.getData()
        item.orderDetail = orderDetailRes
      })
    )
  }
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
    let date = helpers.getDate(item.date_start, 'YYYY-MM-DD')
    
    if (stat[date]) {
      stat[date] =  parseInt(stat[date]) + parseInt(item.total_price)
    } else {
      stat[date] = item.total_price
    }
  })
  let dataSets = {
    date: [],
    data: [],
    info: []
  }
  for (key in stat) {
    dataSets.date.push(key)
    dataSets.data.push(stat[key])
  }
  
  dataSets.info = stat
  return dataSets
}
const checkOrdering = async () => {
  let today = helpers.getCurrentDate()
  let ordering = new orderingModel()
  ordering.date_start = today
  ordering.status = 'wait'
  let schedule = new scheduleModel() // just testing that check ordering worked
  await schedule.save();
  return await ordering.checkUpdateOrdering()
}
const reset = async (contractCode) => {
  let items = new orderingModel()
  items.contract_code = contractCode
  let ordering = await items.getDataByContractCode()
  await Promise.all(
    ordering.map( async (item) => {
      let detailItem = new orderingDetailModel()
      detailItem.order_id = item.id
      await detailItem.delete()
    })
  )
  await items.deleteByContractCode()

}
const getOrderingByContract = async (contractCode, type) => {
  let items = new orderingModel()
  items.contract_code = contractCode
  items.order_type = type
  let result = await items.geDataByType()
  return result
}
const getOrderingDetailByOrderingId = async (orderId) => {
  let items = new orderingDetailModel()
  items.order_id = orderId
  let result = await items.getData()
  return result
}
const orderForward = async (req, res, next) => { // for some materials which have to order before know contract id
  let project = await projectController.getDetailById(req.query.project)
  let store = await storeController.getDetailById(req.query.store)
  let materials = await materialController.getDetailById(req.query.store, req.query.houseId)
  let result = {
    project,
    store,
    orderDetail: materials,
  }
  res.status(200).json(result)
  // console.log(req.query)
}

module.exports.getResource = getResource
module.exports.getAllData = getAllData
module.exports.getData = getData
module.exports.updateData = updateData
module.exports.createExtraData = createExtraData
module.exports.prepareOrdering = prepareOrdering
module.exports.orderMaterial = orderMaterial
module.exports.prepareChartData = prepareChartData
module.exports.getLastOrder = getLastOrder
// module.exports.countOrdering = countOrdering
module.exports.deleteData = deleteData
module.exports.checkOrdering = checkOrdering
module.exports.getDetailByContractCode = getDetailByContractCode
module.exports.reset = reset
module.exports.getOrderingByContract = getOrderingByContract
module.exports.getOrderingDetailByOrderingId = getOrderingDetailByOrderingId
module.exports.orderForward = orderForward
module.exports.countOrderingData = countOrderingData




