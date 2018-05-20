const helpers = require('../Libraries/helpers')
const projectModel = require('../Models/projectModel')
const contractModel = require('../Models/contractModel')
const contractTimeModel = require('../Models/contractTimeModel')

const getData = async (req, res, next) => {
  let id = req.params.key
  let contract = new contractModel(id)
  let contractResult = await contract.getData()
  let projectResult = {}
  if (req.query.type === 'full') {
    let project = new projectModel(contractResult[0].project_id)
    projectResult = await project.getData()
  }
  let result = {
    contract: contractResult[0],
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
      show: ['code', 'house_temp']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

const createData = async (req, res, next) => {
  // console.log(req.body.na)
  let newItem = new contractModel()
  newItem.code = req.body.data.code
  newItem.project_id = req.body.data.projectId
  newItem.contract_type = req.body.data.contractType
  newItem.plan = req.body.data.plan
  newItem.house_temp = req.body.data.houseTemp
  newItem.price = req.body.data.price
  newItem.quarter = req.body.data.quarter
  newItem.date_start = req.body.data.dateStart
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

const updateData = async (req, res, next) => {
  // let newItem = new projectModel(req.params.id)
  // newItem.code= req.body.data.code
  // newItem.name = req.body.data.name
  // newItem.address = req.body.data.address
  // newItem.type = req.body.data.type
  // let result = newItem.update()
  // res.status(200).json(result)
}

const deleteData = async (req, res, next) => {
  let newItem = new contractModel(req.params.id)
  let result = newItem.delete()
  res.status(200).json({})
}

function prepareData (result) {
  let data = {
    header: [{name: 'เลขที่สัญญา'}, {name: 'แบบบ้าน'}],
    body: ''
  }
  data.body = result.map(element => {
    let id = element.id
    let data = {}
    return {
      key: element.id,
      show: ['code', 'house_temp'],
      items: element
    }
  });
  // console.log(data)
  return data
}


module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData