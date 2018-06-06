// const util = require('util')
const helpers = require('../Libraries/helpers')
// const projectModel = require('../Models/projectModel')
const projectController = require('./projectController')
const contractController = require('./contractController')

async function getData (req, res, next) {
  let projectStat = projectController.getStat()
  let contractStat = contractController.getStat()
  let resObj = {
    stat: {
      projectStat,
      contractStat
    }
  }
  res.status(200).json(resObj)
}

module.exports.getData = getData