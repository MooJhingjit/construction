const orderingController = require('./orderingController')
const projectController = require('./projectController')
const contractController = require('./contractController')
const helpers = require('../Libraries/helpers')
const workSheetDetailController = require('./workSheetDetailController')

async function getHomeData (req, res, next) {
  let orderingExtra = await orderingController.prepareChartData('extra')
  let workSheet = await workSheetDetailController.prepareChartData()
  let resObj = {
    extraOrdering : {
      labels: orderingExtra.date,
      datasets: [
        {
          label: 'สั่งซื้อพิเศษ',
          backgroundColor: 'rgba(255,146,146,.7)',
          data: orderingExtra.data
        }
      ]
    },
    paying : {
      labels: workSheet.date,
      datasets: [
        {
          label: 'การจ่ายต่างวด',
          backgroundColor: 'rgba(250,157,50,.7)',
          data: workSheet.data
        }
      ]
    }
  }
  res.status(200).json(resObj)
}

async function getAllData (req, res, next) {
  let data = await projectController.getAllDataFromLosing(req.query.limit, req.query.currentPage, req.query.main_search)
  let result = []
  if (data.result.length) {
    await Promise.all(
      data.result.map( async (item) => {
        let contractTotal = await contractController.countItemByProject(item.id)
        // let totalPrice = await contractController.countItemByProject(item.id)
        result.push({
          projectId: item.id,
          name: item.name,
          contractTotal: contractTotal[0].count
        })
      })
    )
  }
  let config = {
    header: [{name: 'โครงการ'}, {name: 'สัญญา'}],
    show: ['name', 'contractTotal']
  }
  data = helpers.prepareDataTable(result, data.total, config)
  res.status(200).json(data)
}

async function getData (req, res, next) {
  let projectId = req.params.key
  let contract = await contractController.getAllDataFromLosing(projectId)
  res.status(200).json(contract)
}

async function getFullLosing (req, res, next) {
  let contractCode = req.params.key
  // let allContract = await contractController.getContractByProject(projectId)
  let data = {
    losingTotal: 0,
    ordering: [],
    chart: {
      materialItem: {
        // labels: ['กุญแจเขาควาย K-7/B0312/SN ห้องน้ำ (เปิดซ้าย )', 'หินแกรนิตดำซานซีขนาด 60 X 91 cm.', 'หินแกรนิตดำซานซี ขนาด 20x 180 cm', 'กระเบื้องพื้น GRAND VIVA 60x60 cm'],
        labels: [],
        datasets: [
          {
            backgroundColor: '#40A5EF',
            // data: [620.8, 1595, 1044, 716]
            data: []
          }
        ]
      }
    }
  }
  let orderingItems = await orderingController.getOrderingByContract(contractCode, 'extra')
  await Promise.all(
    orderingItems.map( async (orderingItem) => {
      data.losingTotal += orderingItem.total_price
      let orderingDetails = await orderingController.getOrderingDetailByOrderingId(orderingItem.id)
      orderingDetails.map((orderingDetail) => {
        orderingDetail.note = orderingItem.note
        data.ordering.push(orderingDetail)
        data.chart.materialItem.labels.push(orderingDetail.name)
        let price = orderingDetail.unit_price * orderingDetail.amount
        data.chart.materialItem.datasets[0].data.push(price)
      })
    })
  )
  
  res.status(200).json(data)
}


module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.getHomeData = getHomeData
module.exports.getFullLosing = getFullLosing

