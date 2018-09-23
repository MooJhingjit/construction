// const util = require('util')
const helpers = require('../Libraries/helpers')
// const projectModel = require('../Models/projectModel')
const projectController = require('./projectController')
const contractController = require('./contractController')
const orderingController = require('./orderingController')

async function getData (req, res, next) {
  // console.log('do getData from home')
  let projectStat = await projectController.getStat()
  let contractStat = await contractController.getStat()
  let workingProgress = await contractController.getLastProgress()
  let orderingExtra = await orderingController.prepareChartData('extra')
  let resObj = {
    stat: {
      projectStat,
      contractStat
    },
    workingProgress,
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

module.exports.getData = getData