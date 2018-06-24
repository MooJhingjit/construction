
const ordering = require('./orderingController.js')
const workOrder = require('./workOrderController.js')
const workingModel = require('../Models/workingModel')

const updateWorking = async (req, res, next) => {
  // update from frontsite
  // let contractCode = req.xxx

  // find next taskOrder and send to updateWorkingProcess
  // updateWorkingProcess(contractCode)
}

// const updateWorkingProcess = async (contractCode, taskOrder) => {
  // update status at taskOrder

  // order material
  // ordering.prepareOrdering(contractCode, taskOrder)
// }

const setWorkingProcess = async (contractCode, houseId) => { // update from controller Contract
  let workingTemplate = await workOrder.getWorkingTemplate(contractCode)
  await Promise.all(
    workingTemplate.map( async (item) => {
      let newItem = new workingModel(contractCode)
      newItem.time = item.work_order_time
      newItem.order = item.order
      newItem.order_condition = 0
      newItem.name = item.name
      newItem.start_date = null
      newItem.real_date = null
      newItem.delay = 0
      newItem.status = item.work_order_time == 1 && item.order == 1 ? 'ip' : 'wait'
      await newItem.save()
    })
  )
}

const getWorkingProcess = async (contractCode) => {
  let item = new workingModel(contractCode)
  let result = []
  let workProcess = await item.getData()
  if (workProcess.length) {
    currentTask = workProcess.filter((item) => {
      return item.status === 'ip'
    })[0]
    currentTask = currentTask.time
    result = workProcess.filter((item) => {
      return item.time === currentTask
    })
  }
  return result
}

const editWorkingProcess = async (contractCode) => {
  let item = new workingModel()
  
  return result
}


module.exports.getWorkingProcess = getWorkingProcess
module.exports.setWorkingProcess = setWorkingProcess
module.exports.editWorkingProcess = editWorkingProcess