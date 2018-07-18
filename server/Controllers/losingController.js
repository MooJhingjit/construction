const orderingController = require('./orderingController')
const projectController = require('./projectController')
const contractController = require('./contractController')
const helpers = require('../Libraries/helpers')

async function getHomeData (req, res, next) {
  let orderingExtra = await orderingController.prepareChartData('extra')
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
  let projectId = req.params.key
  let data = {
    losingTotal: 'res.data.losingTotal',
    ordering: 'res.data.ordering',
    chart: 'res.data.chart'
  }

  res.status(200).json(data)
}


module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.getHomeData = getHomeData
module.exports.getFullLosing = getFullLosing

