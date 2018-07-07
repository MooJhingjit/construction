const helpers = require('../Libraries/helpers')
// const working = require('./workingController.js')
// const {startOrdering} = require('./orderingController.js')
const projectModel = require('../Models/projectModel')
const contractModel = require('../Models/contractModel')
const contractTimeModel = require('../Models/contractTimeModel')
const contractProgressModel = require('../Models/contractProgressModel')
const workOrder = require('./workOrderController.js')
const ordering = require('./orderingController.js')

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
    contractProgress = await getContractProgress(contract.code)
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
  await newItem.updateStatus()
  switch(newItem.status) {
    case 'ip':
      await startWorking(newItem.code, req.body.data.houseId)
        // await reviewContractProgress(newItem.code, req.body.data.houseId, 1)
        break
    case 'done':
        // orderMaterial()
        break
  }
  let orderingData = await ordering.countOrdering()
  res.status(200).json({orderingData})
}

const startWorking = async (contractCode, houseId) => {
  console.log(contractCode, houseId)
  await setContractProgress(contractCode, houseId)
  await ordering.prepareOrdering(contractCode, houseId, 1, 1) // 1 = time
}
const getDropDown = async (req, res, next) => {
  let model = new contractModel()
  let data = {}
  data = await model.getAllSelection()
  data = data.map(item => {
    return {
      key: item.code,
      value: `${item.code}`
    }
  })
  
  res.status(200).json(data)
}

const getContractProgress = async (contractCode) => {
  let item = new contractProgressModel(contractCode)
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

// copy progress
const setContractProgress = async (contractCode, houseId) => {
  let workingTemplate = await workOrder.getWorkingTemplate(contractCode)
  await Promise.all(
    workingTemplate.map( async (item) => {
      let newItem = new contractProgressModel(contractCode)
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

const updateContractProgress = async (req, res, next) => {
  let progress = req.body.data
  await Promise.all(
    progress.map( async (item) => {
      let progress = new contractProgressModel()
      progress.start_date = helpers.getDate(item.start_date)
      progress.real_date = helpers.getDate(item.real_date)
      progress.delay = item.delay
      progress.id = item.id
      await progress.updateDate()
    })
  )
  res.status(200).json({})
}

const updateContractTask = async (req, res, next) => {
  // update from frontsite
  // let contractCode = req.xxx
  // find next taskOrder and send to updateWorkingProgress
  // ordering.prepareOrdering(contractCode, taskOrder)
}

// const reviewContractProgress = async (contractCode = '', houseId, taskOrder) => {
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

module.exports.getStat = getStat
module.exports.getData = getData
module.exports.deleteData = deleteData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.getDropDown = getDropDown
module.exports.getLastProgress = getLastProgress
module.exports.updateTimeData = updateTimeData
module.exports.getContractPeriod = getContractPeriod
module.exports.updateContractStatus = updateContractStatus
module.exports.updateContractProgress = updateContractProgress
module.exports.getDetailByContractCode = getDetailByContractCode