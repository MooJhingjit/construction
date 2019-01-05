const helpers = require('../Libraries/helpers')
const workSheetDetailController = require('./workSheetDetailController')
const PayingCore = require('../Cores/paying.js')

async function getData (req, res, next) {
  let submitStat = await workSheetDetailController.getStat('submit')
  let approvedStat = await workSheetDetailController.getStat('approved')
  let resObj = {
    stat: {
      submitStat,
      approvedStat
    }
  }
  res.status(200).json(resObj)
}

async function getSummary (req, res, next) {
  let projectId = req.query.project
  let technicianId = req.query.technician
  let type = null
  if (req.query.type) {
    type = req.query.type.split(',')
  }
  let resObj = await PayingCore.getSummary(projectId, technicianId, type)
  res.status(200).json(resObj)
}

module.exports.getData = getData
module.exports.getSummary = getSummary