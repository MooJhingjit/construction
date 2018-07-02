// const util = require('util')
const helpers = require('../Libraries/helpers')
// const projectModel = require('../Models/projectModel')
const projectController = require('./projectController')
const contractController = require('./contractController')
const orderingController = require('./orderingController')

async function getData (req, res, next) {
  let projectStat = await projectController.getStat()
  let contractStat = await contractController.getStat()
  let workingProgress = await contractController.getLastProgress()
  let orderingExtra = await orderingController.prepareChartData('extra')
  console.log(orderingExtra)
  let resObj = {
    stat: {
      projectStat,
      contractStat
    },
    workingProgress,
    extraOrdering : {
      // labels: ['มกราคม', 'กุมภาพันธ์', 'March', 'เมษายน', 'พฤษภาคม', 'June', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
      labels: orderingExtra.date,
      datasets: [
        {
          label: 'การจ่ายค่างวด',
          backgroundColor: 'rgba(255,146,146,.7)',
          // data: [20, 50, 12, 26, 13, 20, 54, 24, 42, 45, 23, 31]
          data: orderingExtra.data
        }
      ]
    }
  }
  res.status(200).json(resObj)
}

module.exports.getData = getData