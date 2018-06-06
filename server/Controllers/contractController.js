const helpers = require('../Libraries/helpers')
const projectModel = require('../Models/projectModel')
const contractModel = require('../Models/contractModel')
const contractTimeModel = require('../Models/contractTimeModel')

const getData = async (req, res, next) => {
  let contract = new contractModel()
  contract.code = req.params.key
  let contractResult = await contract.getData()
  let projectResult = {}
  if (req.query.type === 'full') {
    let project = new projectModel(contractResult[0].project_id)
    projectResult = await project.getData()
    let contractTime = new contractTimeModel()
    contractTime.contract_code = req.params.key
    projcontractTimeResult = await contractTime.getData()
  }
  let result = {
    contract: contractResult[0],
    contractTime: projcontractTimeResult,
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
  newItem.quarter = req.body.data.quarter
  newItem.date_start = helpers.getCurrentTime('date', req.body.data.dateStart)
  newItem.paid = req.body.data.paid
  newItem.status = req.body.data.status
  let result = await newItem.save() // this will return result.insertId
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

// function prepareData (result) {
//   let data = {
//     header: [{name: 'เลขที่สัญญา'}, {name: 'แบบบ้าน'}],
//     body: ''
//   }
//   data.body = result.map(element => {
//     let id = element.id
//     let data = {}
//     return {
//       key: element.id,
//       show: ['code', 'house_id'],
//       items: element
//     }
//   });
  // console.log(data)
//   return data
// }

module.exports.getStat = getStat
module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateTimeData = updateTimeData
module.exports.deleteData = deleteData