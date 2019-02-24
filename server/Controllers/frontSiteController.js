const helpers = require('../Libraries/helpers')
const contract = require('./contractController.js')

async function getAllData (req, res, next) {
  let userAuth = helpers.getUserAuth(req.headers['authorization'])
  let data = await contract.getShortCutContract(userAuth.id)
  res.status(200).json(data)
}

async function getData (req, res, next) {
  let data = await contract.getDetailByContractCode(['project'], req.params.key, false) // false === by id
  data.time = await contract.getContractTime(data.contract.code) // false = get all task
  res.status(200).json(data)
}

async function updateTask (req, res, next) {
  let userAuth = helpers.getUserAuth(req.headers['authorization'])
  let contractData = req.body.data
  //
  if (await checkTaskPermission(contractData.contract_code, userAuth.id)) {
    contract.updateContractTask(contractData.contract_code, contractData.houseId, contractData.time, contractData.order_all, 'done', contractData.projectTypeId)
    res.status(200).json({})
  } else {
    res.status(301).json({})
  }
}

const checkTaskPermission = async (contractCode, userId) => {
  let result = await contract.checkContractPermission(contractCode, userId)
  return result
}
module.exports.getAllData = getAllData
module.exports.getData = getData
module.exports.updateTask = updateTask