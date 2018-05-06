const helpers = require('../Libraries/helpers')
const projectModel = require('../Models/projectModel')

module.exports.getData = (req, res, next) => {
  // let userData = helpers.getUserAuth(req.headers['authorization'])
  let id = req.params.key
  // if (req.params.key == 'profile') {
  //   id = userData.id
  // }
  let project = new projectModel(id)
  project.getData((result) => {
    res.status(200).json(result[0])
  })
}

module.exports.getAllData = (req, res, next) => {
  let project = new projectModel()
  project.getAllData((result) => {
    let data = prepareData(result)
    res.status(200).json(data)
  })
}

module.exports.create = (req, res, next) => {
  // console.log(req.body.na)
  let newItem = new projectModel()
  newItem.code= req.body.data.code
  newItem.name = req.body.data.name
  newItem.type = req.body.data.type
  let result = newItem.save()
  res.status(200).json(result)
}

module.exports.update = (req, res, next) => {
  // console.log(req.body.na)
  let newItem = new projectModel(req.params.id)
  newItem.code= req.body.data.code
  newItem.name = req.body.data.name
  newItem.type = req.body.data.type
  let result = newItem.update()
  // console.log(result)
  res.status(200).json(result)
}

module.exports.delete = (req, res, next) => {
  let newItem = new projectModel(req.params.id)
  let result = newItem.delete()
  res.status(200).json({})
}

function prepareData (result) {
  let data = {
    header: [{name: 'รหัส'}, {name: 'ชื่อโครงการ'}, {name: 'ประเภท'}],
    body: ''
  }
  data.body = result.map(element => {
    let id = element.id
    let data = {}
    return {
      key: element.id,
      show: ['code', 'name', 'type'],
      items: element
    }
  });
  // console.log(data)
  return data
}