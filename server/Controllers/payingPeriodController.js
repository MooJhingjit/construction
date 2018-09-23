const helpers = require('../Libraries/helpers')
const workSheetDetailController = require('./workSheetDetailController')

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

module.exports.getData = getData