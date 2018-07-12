const helpers = require('../Libraries/helpers')
const contract = require('./contractController.js')

async function getAllData (req, res, next) {
  let data = await contract.getShortCutContract()
  res.status(200).json(data)
}

async function getData (req, res, next) {
  let data = await contract.getDetailByContractCode(['project'], req.params.key)
  data.time = await contract.getContractTime(req.params.key) // false = get all task
  res.status(200).json(data)
}
module.exports.getAllData = getAllData
module.exports.getData = getData