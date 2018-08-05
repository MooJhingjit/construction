const helpers = require('../Libraries/helpers')
const projectModel = require('../Models/projectModel')

const getData = (req, res, next) => {
  // let userData = helpers.getUserAuth(req.headers['authorization'])
  let id = req.params.key
  let project = new projectModel(id)
  project.getData()
  .then((result) => {
    res.status(200).json(result[0])
  })
}

async function getAllData (req, res, next) {
  let project = new projectModel()
  let data = []
  project.status = req.query.status
  project.name = req.query.main_search
  let total = await project.count()
  project.limit = req.query.limit
  project.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await project.getAllData()
  if (result) {
    let config = {
      header: [{name: 'รหัส'}, {name: 'ชื่อโครงการ'}],
      show: ['code', 'name']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

async function getAllDataFromLosing (limit, currentPage, main_search) {
  let project = new projectModel()
  project.name = main_search
  let total = await project.count()
  project.limit = limit
  project.offset = helpers.getTableoffset(limit, currentPage)
  let result = await project.getAllData()
  return {result, total}
}

async function createData (req, res, next) {
  let newItem = new projectModel()
  newItem.code= req.body.data.code
  newItem.name = req.body.data.name
  newItem.address = req.body.data.address
  newItem.type = req.body.data.type
  let result = await newItem.save()
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  let item = new projectModel(req.params.id)
  item.code= req.body.data.code
  item.name = req.body.data.name
  item.address = req.body.data.address
  item.type = req.body.data.type
  let result = await item.update()
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new projectModel(req.params.id)
  let result = await item.delete()
  res.status(200).json({})
}

// function getStat () {
//   let project = new projectModel()
//   return {
//     count: 120,
//     class: 'project',
//     name: 'Project',
//     detail: '',
//     dataSets: {
//       label: ['xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx', 'xx-xx-xxxx'],
//       values: [1, 5, 6, 8, 7, 4, 5, 9, 2, 7, 2, 5]
//     },
//     barColor: '#4571BB'
//   }
// }

const getStat = async () => {
  let project = new projectModel()
  let projectRes = await project.getStat()
  let stat = []
  projectRes.map((item) => {
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
    class: 'project',
    name: 'Project',
    detail: '',
    dataSets,
    barColor: '#4571BB'
  }
}

const getDropDown = async (req, res, next) => {
  let model = new projectModel()
  let data = {}
  data = await model.getAllSelection()
  data = data.map(item => {
    return {
      key: item.id,
      value: `${item.name}`
    }
  })
  
  res.status(200).json(data)
}

const checkDuplicate = async (req, res, next) => {
  let project = new projectModel()
  if (req.query.field === 'code') {
    project.code = req.query.value
  } else if (req.query.field === 'name') {
    project.name = req.query.value
  }
  project.id = req.query.id
  let data = await project.checkDuplicate()
  res.status(200).json(data)
}

const getDetailById = async (projectId) => {
  let projectItem = new projectModel(projectId)
  project = await projectItem.getData()
  return project[0]
}

module.exports.getStat = getStat
module.exports.getData = getData
module.exports.getDropDown = getDropDown
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
module.exports.getDetailById = getDetailById
module.exports.getAllDataFromLosing = getAllDataFromLosing
module.exports.checkDuplicate = checkDuplicate
