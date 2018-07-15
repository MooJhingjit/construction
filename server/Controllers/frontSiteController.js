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
  let contractData = req.body.data
  // checkTaskPermission(contractCode)
  contract.updateContractTask(contractData.contract_code, contractData.houseId, contractData.time, contractData.order_all, 'done')
  res.status(200).json({})
}


const checkTaskPermission = async (contractCode) => { // <---------------------
  // add column assign in contract table 

  // check premission

}
module.exports.getAllData = getAllData
module.exports.getData = getData
module.exports.updateTask = updateTask