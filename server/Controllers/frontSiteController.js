const helpers = require('../Libraries/helpers')
// const contractProgressModel = require('../Models/contractProgressModel')
const contract = require('./contractController.js')

async function getAllData (req, res, next) {
  let data = await contract.getShortCutContract()
  
  res.status(200).json(data)
}

module.exports.getAllData = getAllData