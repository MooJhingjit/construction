
const ordering = require('./orderingController.js')
const workOrder = require('./workOrderController.js')
const workingModel = require('../Models/workingModel')

const updateWorking = async (req, res, next) => {
  // update from frontsite
  // let contractCode = req.xxx

  // find next taskOrder and send to updateWorkingProgress
  // updateWorkingProgress(contractCode)
}

// const updateWorkingProgress = async (contractCode, taskOrder) => {
  // update status at taskOrder

  // order material
  // ordering.prepareOrdering(contractCode, taskOrder)
// }

const setWorkingProgress = async (contractCode, houseId) => { // update from controller Contract
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

const getWorkingProgress = async (contractCode) => {
  let item = new workingModel(contractCode)
  let result = []
  let workProgress = await item.getData()
  if (workProgress.length) {
    currentTask = workProgress.filter((item) => {
      return item.status === 'ip'
    })[0]
    currentTask = currentTask.time
    result = workProgress.filter((item) => {
      return item.time === currentTask
    })
  }
  return result
}

const editWorkingProgress = async (contractCode) => {
  let item = new workingModel()
  
  return result
}

// const getWorkStarting = async () => {

// }


module.exports.getWorkingProgress = getWorkingProgress
module.exports.setWorkingProgress = setWorkingProgress
module.exports.editWorkingProgress = editWorkingProgress
module.exports.getWorkStarting = getWorkStarting