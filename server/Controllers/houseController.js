// const util = require('util')
const helpers = require('../Libraries/helpers')
const houseModel = require('../Models/houseModel')

const getData = (req, res, next) => {
  // let id = req.params.key
  // let project = new projectModel(id)
  // project.getData()
  // .then((result) => {
  //   res.status(200).json(result[0])
  // })
}

async function getAllData (req, res, next) {
  let house = new houseModel()
  let data = []
  house.type = req.query.status
  house.name = req.query.main_search
  let total = await house.count()
  house.limit = req.query.limit
  house.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await house.getAllData()
  if (result) {
    let config = {
      header: [{name: 'แปลง'}, {name: 'แบบบ้าน'}],
      show: ['plan', 'name']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

async function getDropDown (req, res, next) {
  let house = new houseModel()
  let data = {}
  if (req.query.house) {
    house.name = req.query.house
    data = await house.getPlanSelection()
    data = data.map(item => {
      return {
        key: item.plan,
        value: `${item.plan}`
      }
    })
  } else {
    data = await house.getAllSelection()
    data = data.map(item => {
      return {
        key: item.name,
        value: `${item.name}`
      }
    })
  }
  
  res.status(200).json(data)
}

const getPlanDropDown = async (req, res, next) => {
  let model = new houseModel()
  let data = {}
  data = await model.getAllPlanSelection()
  data = data.map(item => {
    return {
      key: item.plan,
      value: `${item.plan}`
    }
  })
  res.status(200).json(data)
}

async function createData (req, res, next) {
  let newItem = new houseModel()
  newItem.plan = req.body.data.plan
  newItem.name = req.body.data.name
  newItem.type = req.body.data.type
  newItem.tile = req.body.data.tile
  newItem.garage = req.body.data.garage
  newItem.stair = req.body.data.stair
  newItem.color = req.body.data.color
  let result = await newItem.save()
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  let item = new houseModel(req.params.id)
  item.plan = req.body.data.plan
  item.name = req.body.data.name
  item.type = req.body.data.type
  item.tile = req.body.data.tile
  item.garage = req.body.data.garage
  item.stair = req.body.data.stair
  item.color = req.body.data.color
  let result = await item.update()
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new houseModel(req.params.id)
  let result = await item.delete()
  res.status(200).json({})
}

module.exports.getData = getData
module.exports.getDropDown = getDropDown
module.exports.getPlanDropDown = getPlanDropDown
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData