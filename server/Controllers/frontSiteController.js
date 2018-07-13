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

async function updateTask (req, res, next) { // <---------------------
  // checkTaskPermission(contractCode)
  // contract.updateContractTask(contractCode, time, order, status)
  res.status(200).json({})
}


const checkTaskPermission = async (contractCode) => { // <---------------------
  // add column assign in contract table 

  // check premission

}
module.exports.getAllData = getAllData
module.exports.getData = getData
module.exports.updateTask = updateTask