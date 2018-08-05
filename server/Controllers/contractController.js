const helpers = require('../Libraries/helpers')
const project = require('./projectController.js')
// const {startOrdering} = require('./orderingController.js')
const projectModel = require('../Models/projectModel')
const contractModel = require('../Models/contractModel')
const contractTimeModel = require('../Models/contractTimeModel')
const contractProgressModel = require('../Models/contractProgressModel')
const workOrder = require('./workOrderController.js')
const ordering = require('./orderingController.js')
// const store = require('./storeController.js')

const getData = async (req, res, next) => {
  let contract = new contractModel()
  contract.code = req.params.key
  let contractResult = await contract.getData()
  let projectResult = {}
  let contractProgress = []
  if (req.query.type === 'full') {
    let project = new projectModel(contractResult[0].project_id)
    projectResult = await project.getData()
    let contractTime = new contractTimeModel()
    contractTime.contract_code = req.params.key
    projcontractTimeResult = await contractTime.getData()
    contractProgress = await getContractAllProgress(contract.code, false)
  }
  let result = {
    contract: contractResult[0],
    contractTime: projcontractTimeResult,
    progress: contractProgress,
    project: projectResult[0],
    status: 'success'
  }
  
  res.status(200).json(result)
}

const getAllData = async (req, res, next) => {
  let contract = new contractModel()
  contract.status = req.query.status
  contract.code = req.query.main_search
  let total = await contract.count()
  contract.limit = req.query.limit
  contract.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await contract.getSelectedData()
  let data = []
  if (result) {
    let config = {
      header: [{name: 'เลขที่สัญญา'}, {name: 'แบบบ้าน'}],
      show: ['code', 'house_id']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

const createData = async (req, res, next) => {
  let newItem = new contractModel()
  newItem.code = req.body.data.code
  newItem.project_id = req.body.data.projectId
  newItem.contract_type = req.body.data.contractType
  newItem.plan = req.body.data.plan
  newItem.house_id = req.body.data.houseId
  newItem.price = req.body.data.price
  newItem.date_start = helpers.getCurrentTime('date', req.body.data.dateStart)
  newItem.paid = req.body.data.paid || 0
  newItem.status = req.body.data.status
  let result = await newItem.save() // this will return result.insertId
  if (newItem.status === 'ip') {
    await startWorking(newItem.code, newItem.house_id)
  }
  await createContractTime(req.body.data.code, req.body.data.times)

  let orderingData = await ordering.countOrdering()
  res.status(200).json({status: 'success', orderingData})
}

const createContractTime = (contractCode, dataArr) => {
  dataArr.forEach(item => {
    let newContractTime = new contractTimeModel()
    newContractTime.contract_code = contractCode
    newContractTime.time = item.time
    newContractTime.price = item.price
    newContractTime.is_success = 0
    newContractTime.date_start = item.dateStart
    newContractTime.date_end = item.dateEnd
    newContractTime.save()
  });
}

const updateTimeData = async (req, res, next) => {
  let contractTime = new contractTimeModel(req.params.id)
  contractTime.is_success = req.body.data.isSuccess  ? 1 : 0
  await contractTime.updateData()
  res.status(200).json({})
}

const deleteData = async (req, res, next) => {
  let newItem = new contractModel(req.params.id)
  let result = newItem.delete()
  res.status(200).json({})
}

const checkDuplicate = async (req, res, next) => {
  let contract = new contractModel()
  contract.code = req.query.value
  let data = await contract.checkDuplicate()
  res.status(200).json(data)
}

const getStat = async () => {
  let contract = new contractModel()
  let contractRes = await contract.getStat()
  let stat = []
  contractRes.map((item) => {
    let date = helpers.getDate(item.created_at, 'YYYY-MM-DD')
    if (stat[date]) {
      stat[date] +=  1
    } else {
      stat[date] = 1
    }
  })
  let dataSets = {
    label: [],
    values: []
  }
  let count = 0
  for (key in stat) {
    dataSets.label.push(key)
    dataSets.values.push(stat[key])
    count += stat[key]
  } 
  return {
    count: count,
    class: 'contract',
    name: 'Contract',
    detail: '',
    dataSets,
    barColor: '#4571BB'
  }
}

const getContractPeriod = async (req, res, next) => {
  let item = new contractModel()
  item.house_id = req.params.house_id
  let result = await item.getPreiod()
  let obj = null
  // console.log(result.length)
  if (result.length) {
    obj = {}
    result.map((item) => {
      obj[item.time] = item.preiod
    })
  }
  res.status(200).json(obj)
}

const updateContractStatus = async (req, res, next) => {
  let contractCode = req.params.id
  let status = req.body.data.status
  let houseId = req.body.data.houseId
  let assign = req.body.data.assign
  await updateStatus(contractCode, status, assign)
  switch(status) {
    case 'ip':
      await startWorking(contractCode, houseId)
        // await reviewContractProgress(item.code, req.body.data.houseId, 1)
        break
    case 'done':
        // orderMaterial()
        break
  }
  let orderingData = await ordering.countOrdering()
  res.status(200).json({orderingData})
}

const startWorking = async (contractCode, houseId) => {
  // this from frist created
  await setContractProgress(contractCode, houseId)
  await updateContractTask(contractCode, houseId, 1, 1, 'done')
  // await findTaskAndOrderMaterial(contractCode, houseId, 0)
}

const getDropDown = async (req, res, next) => {
  let model = new contractModel()
  let type = 'normal'
  if (req.query) {
    if (req.query.type === 'project-search') {
      type = req.query.type 
    }
  }
  let data = {}
  data = await model.getAllSelection(type)
  if (type == 'normal') {
    data = data.map(item => {
      return {
        key: item.code,
        value: `${item.code}`
      }
    })
  }
  res.status(200).json(data)
}

const getContractAllProgress = async (contractCode, getCurrentTask = true) => {
  let item = new contractProgressModel(contractCode)
  let result = []
  let workProgress = await item.getData()
  if (getCurrentTask) {
    if (workProgress.length) {
      currentTask = workProgress.filter((item) => {
        return item.status === 'ip'
      })[0]
      currentTask = currentTask.time
      result = workProgress.filter((item) => {
        return item.time === currentTask
      })
    }
  } else {
    result = workProgress
  }
  // console.log(result)
  return result
}

const getContractProgress = async (contractCode, time) => {
  let item = new contractProgressModel(contractCode)
  item.time = time
  let progress = await item.getData()
  return progress
}

const getContractTime = async (contractCode) => {
  let contractTime = new contractTimeModel()
  contractTime.contract_code = contractCode
  contractTimeResult = await contractTime.getData()
  await Promise.all(
    contractTimeResult.map( async (item) => {
      // console.log(item.time)
      item.progress = await getContractProgress(contractCode, item.time)
    })
  )
  return contractTimeResult
}

// copy progress
const setContractProgress = async (contractCode, houseId) => {
  let workOrderPreiod = await workOrder.getWorkOrderPreiod(houseId)
  let workingTemplate = await workOrder.getWorkingTemplate(contractCode)
  let startDate = helpers.getCurrentDate('YYYY-MM-DD')
  let endDate = ''
  let orderNumber = 1
  let tempEndDate = []
  let tempStartDate = []
  tempStartDate[0] = startDate
  tempEndDate[0] = startDate
  await Promise.all(
    workingTemplate.map( async (item) => {
      let workOrder = await matchWorkOrderPreiod(workOrderPreiod, item.work_order_time, item.order)
      let condition = workOrder.condition !== null ? workOrder.condition : null
      if (tempEndDate.length == 1) { // for frist round
        // console.log(workOrder.preiod_end)
        tempStartDate[orderNumber] = startDate
        tempEndDate[orderNumber] = helpers.addDate(startDate, workOrder.preiod_end, format = 'YYYY-MM-DD')
        endDate = tempEndDate[orderNumber]
      } else {
        let indexCondition = condition
        if (indexCondition === null) {
          indexCondition = 0
        }
        startDate = helpers.addDate(tempEndDate[indexCondition], workOrder.preiod, format = 'YYYY-MM-DD')
        tempEndDate[orderNumber] = helpers.addDate(startDate, workOrder.preiod_end, format = 'YYYY-MM-DD')
        endDate = tempEndDate[orderNumber]
      }
      let newItem = new contractProgressModel(contractCode)
      newItem.time = item.work_order_time
      newItem.order = item.order
      // newItem.order_condition = 0
      newItem.order_all = orderNumber
      newItem.name = item.name
      newItem.start_date = condition === null ? null : startDate
      newItem.end_date = condition === null ? null : endDate
      newItem.real_date = null
      newItem.condition = condition
      newItem.delay = 0
      // newItem.status = condition === 0 ? 'ip' : 'wait'
      newItem.status = 'wait' 
      orderNumber = parseInt(orderNumber) + 1
      await newItem.save()
      
    })
  )
}

const matchWorkOrderPreiod = async (workOrderPreiod, time, order) => {
  let preiod = 0
  let preiod_end = 0
  let condition = 0
  await Promise.all(
    workOrderPreiod.map(async (item) => {
      if (item.work_order_time === time && item.order === order) {
        preiod = item.preiod
        preiod_end = item.preiod_end
        condition = item.condition
      }
    })
  )
  return {
    preiod,
    preiod_end,
    condition
  }
}
// update only date and delay from contract page
const updateContractProgress = async (req, res, next) => {
  let contractCode = req.params.id
  let assign = req.body.data.assign
  await updateStatus(contractCode, null, assign)
  let progress = req.body.data.progress
  await Promise.all(
    progress.map( async (item) => {
      let progress = new contractProgressModel()
      // progress.start_date = helpers.getDate(item.start_date)
      progress.real_date = helpers.getDate(item.real_date)
      progress.delay = item.delay
      progress.id = item.id
      await progress.updateDate()
    })
  )
  res.status(200).json({})
}
// update task and order material
const updateContractTask = async (contractCode, houseId, time, order_all, status) => {
  // console.log(contractCode, houseId, time, order_all, status)
  let progressId = await updateTask(contractCode, time, order_all, status)
  if (progressId) { //task updated
    await findTaskAndOrderMaterial(contractCode, houseId, order_all, progressId)
  }
}

const getLastProgress = async () => {
  let item = new contractProgressModel()
  let progressRes = await item.getLastProgress()
  let obj = []
  await Promise.all(
    progressRes.map( async (item) => {
      let contractData = await getDetailByContractCode(['project'], item.contract_code)
      obj.push({
        plan: contractData.contract.plan,
        houseId: contractData.contract.house_id,
        projectName: contractData.project.name,
        contractCode: item.contract_code,
        status: item.name,
      })
    })
  )
  return obj
}

const getShortCutContract = async (userId) => { // this for front site
  let contract = new contractModel()
  contract.status = 'ip'
  contract.assign = userId
  let contractData = await contract.getAllData()
  await Promise.all(
    contractData.map( async (item) => {
      item.project = await project.getDetailById(item.project_id)
      item.ordering = await ordering.getDetailByContractCode(item.code, false) // false == don't get ordering detail
    })
  )
  
  return contractData
}

const updateStatus = async (contractCode, status, assign) => {
  let item = new contractModel()
  item.code = contractCode
  item.assign = assign
  if (status != null) {
    item.status = status
  }
  await item.updateStatus() // on
  return true
}

const updateTask = async (contractCode, time, order_all, status) => {
  let currentProgress = new contractProgressModel(contractCode)
  currentProgress.time = time
  currentProgress.order_all = order_all
  currentProgress = await currentProgress.getCurrentProgress()
  let currentEndDate = currentProgress[0].end_date
  // console.log(currentEndDate)
  // console.log(helpers.getCurrentDate(), currentEndDate)
  // console.log(helpers.getDateDiff(currentEndDate, helpers.getCurrentDate()))
  // return false
  // console.log(helpers.getDateDiff(currentEndDate, helpers.getCurrentDate()))
  let progress = new contractProgressModel(contractCode)
  progress.time = time
  progress.order_all = order_all
  progress.status = status
  progress.real_date = helpers.getCurrentDate('YYYY-MM-DD') // set date for starting order and plus with delay
  progress.delay = helpers.getDateDiff(currentEndDate, helpers.getCurrentDate())
  await progress.updateProgress()
  return currentProgress[0].id
}

const findTaskAndOrderMaterial = async (contractCode, houseId, orderProcress, progressId) => { // orderProcress is order_all
  // update next task to in process
  let nextTesk = new contractProgressModel(contractCode)
  nextTesk.condition = orderProcress
  nextTesk.status = 'ip'
  await nextTesk.updateStatus()

  let startWorking = new contractProgressModel(contractCode)
  startWorking.order_all = orderProcress
  let res = await startWorking.startWorking()
  await Promise.all(
    res.map( async (item) => {
      await ordering.prepareOrdering(contractCode, houseId, item.order, item.time, progressId)
    })
  )
}

const resetData = async (req, res, next) => {
  // console.log(req.params.key)
  let contractCode = req.params.key
  let contract = new contractModel()
  contract.code = contractCode
  contract.status = 'wait'
  await contract.updateStatus()

  let progress = new contractProgressModel(contractCode)
  await progress.delete()

  await ordering.reset(contractCode)
  res.status(200).json({})
}

const checkContractPermission = async (contractCode, userId) => {
  let contract = new contractModel()
  contract.code = contractCode
  contract.assign = userId
  let result = await contract.checkPermission()
  if (result.length === 0) {
    return false
  }
  return true
}

const countItemByProject = async (projectId) => {
  let contract = new contractModel()
  contract.project_id = projectId
  let result = await contract.count()
  return result
}

async function getAllDataFromLosing (projectId) {
  let contract = new contractModel()
  contract.project_id = projectId
  let result = await contract.getAllData()
  return result
}

const getDetailByContractCode = async (typeSelect, code) => {
  let contractItem = new contractModel()
  contractItem.code = code
  let contract = await contractItem.getData()
  let project = [null]
  if (typeSelect.indexOf('project') >= 0) {
    let projectItem = new projectModel(contract[0].project_id)
    project = await projectItem.getData()
  }
  // if (typeSelect.indexOf('project') >= 0) {
  //   let projectItem = new projectModel(contract[0].project_id)
  //   project = await projectItem.getData()
  // }
  return {contract: contract[0], project: project[0]}
}

const getContractByProject = async (projectId) => {
  let contractItem = new contractModel()
  contractItem.project_id = projectId
  let result = await contractItem.getAllData()
  return result
}

module.exports.getStat = getStat
module.exports.getData = getData
module.exports.deleteData = deleteData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.getDropDown = getDropDown
module.exports.getLastProgress = getLastProgress
module.exports.updateTimeData = updateTimeData
module.exports.getShortCutContract = getShortCutContract
module.exports.getContractPeriod = getContractPeriod
module.exports.updateContractStatus = updateContractStatus
module.exports.updateContractProgress = updateContractProgress
module.exports.getDetailByContractCode = getDetailByContractCode
module.exports.getContractAllProgress = getContractAllProgress
module.exports.getContractTime = getContractTime
module.exports.updateContractTask = updateContractTask
module.exports.resetData = resetData
module.exports.checkContractPermission = checkContractPermission
module.exports.countItemByProject = countItemByProject
module.exports.getAllDataFromLosing = getAllDataFromLosing
module.exports.getContractByProject = getContractByProject
module.exports.checkDuplicate = checkDuplicate



