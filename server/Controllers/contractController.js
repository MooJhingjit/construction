const helpers = require('../Libraries/helpers')
// const working = require('./workingController.js')
// const {startOrdering} = require('./orderingController.js')
const projectModel = require('../Models/projectModel')
const contractModel = require('../Models/contractModel')
const contractTimeModel = require('../Models/contractTimeModel')
const contractProcessModel = require('../Models/contractProcessModel')
const workOrder = require('./workOrderController.js')
const ordering = require('./orderingController.js')

const getData = async (req, res, next) => {
  let contract = new contractModel()
  contract.code = req.params.key
  let contractResult = await contract.getData()
  let projectResult = {}
  let contractProcess = []
  if (req.query.type === 'full') {
    let project = new projectModel(contractResult[0].project_id)
    projectResult = await project.getData()
    let contractTime = new contractTimeModel()
    contractTime.contract_code = req.params.key
    projcontractTimeResult = await contractTime.getData()
    contractProcess = await getContractProcess(contract.code)
  }
  let result = {
    contract: contractResult[0],
    contractTime: projcontractTimeResult,
    process: contractProcess,
    project: projectResult[0],
    status: 'success'
  }
  
  res.status(200).json(result)
}

const getAllData = async (req, res, next) => {
  let contract = new contractModel()
  contract.status = req.query.status
  contract.name = req.query.main_search
  let total = await contract.count()
  contract.limit = req.query.limit
  contract.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await contract.getAllData()
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
  // newItem.quarter = req.body.data.quarter
  newItem.date_start = helpers.getCurrentTime('date', req.body.data.dateStart)
  newItem.paid = req.body.data.paid || 0
  newItem.status = req.body.data.status
  let result = await newItem.save() // this will return result.insertId
  if (newItem.status === 'ip') {
    startWorking(result.insertId, newItem.house_id)
  }
  await createContractTime(req.body.data.code, req.body.data.times)

  res.status(200).json({status: 'success'})
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

function getStat () {
  let contract = new contractModel()
  return {
    count: 120,
    class: 'contract',
    name: 'Contract',
    detail: '',
    dataSets: {
      label: ['xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx'],
      values: [1, 5, 6, 8, 7, 4, 5, 9, 2, 7, 2, 5]
    },
    barColor: '#4571BB'
  }
}

const getContractPeriod = async (req, res, next) => {
  let item = new contractModel()
  item.house_id = req.params.house_id
  let result = await item.getPreiod()
  let obj = null
  console.log(result.length)
  if (result.length) {
    obj = {}
    result.map((item) => {
      obj[item.time] = item.preiod
    })
  }
  res.status(200).json(obj)
}

const updateContractStatus = async (req, res, next) => {
  let newItem = new contractModel()
  newItem.code = req.params.id
  newItem.status = req.body.data.status
  let result = await newItem.updateStatus()
  switch(newItem.status) {
    case 'ip':
        await setContractProcess(newItem.code, req.body.data.houseId)
        await ordering.prepareOrdering(req.params.id, req.body.data.houseId, 1, 1) // 1 = time
        // await reviewContractProcess(newItem.code, req.body.data.houseId, 1)
        break
    case 'done':
        // orderMaterial()
        break
  }
  res.status(200).json({})
}

const getContractProcess = async (contractCode) => {
  let item = new contractProcessModel(contractCode)
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

// copy process
const setContractProcess = async (contractCode, houseId) => {
  let workingTemplate = await workOrder.getWorkingTemplate(contractCode)
  await Promise.all(
    workingTemplate.map( async (item) => {
      let newItem = new contractProcessModel(contractCode)
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

const updateContractProcess = async (req, res, next) => {
  let process = req.body.data
  await Promise.all(
    process.map( async (item) => {
      let process = new contractProcessModel()
      process.start_date = helpers.getDate(item.start_date)
      process.real_date = helpers.getDate(item.real_date)
      process.delay = item.delay
      process.id = item.id
      await process.updateDate()
    })
  )
  res.status(200).json({})
}

const updateContractTask = async (req, res, next) => {
  // update from frontsite
  // let contractCode = req.xxx
  // find next taskOrder and send to updateWorkingProcess
  // ordering.prepareOrdering(contractCode, taskOrder)
}

// const reviewContractProcess = async (contractCode = '', houseId, taskOrder) => {
//   // review for checking what is the order
//   ordering.prepareOrdering(houseId, taskOrder, 1) // 1 = time
// }

const getContractDetail = async (contractCode, type) => {
  let item = new contractModel()
  item.code = contractCode
  let result = await item.getContractDetail()
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
  return {contract: contract[0], project: project[0]}
}
module.exports.getStat = getStat
module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateContractStatus = updateContractStatus
module.exports.updateTimeData = updateTimeData
module.exports.deleteData = deleteData
module.exports.getContractPeriod = getContractPeriod
module.exports.updateContractProcess = updateContractProcess
module.exports.getDetailByContractCode = getDetailByContractCode