const helpers = require('../Libraries/helpers')
const contractModel = require('../Models/contractModel')

// module.exports.getData = (req, res, next) => {
//   let id = req.params.key
//   let project = new projectModel(id)
//   project.getData((result) => {
//     res.status(200).json(result[0])
//   })
// }

// module.exports.getAllData = (req, res, next) => {
//   let project = new projectModel()
//   project.status = req.query.status
//   project.name = req.query.main_search
//   project.getAllData((result) => {
//     let data = []
//     if (result) {
//       data = prepareData(result)
//     }
//     res.status(200).json(data)
//   })
// }

module.exports.create = (req, res, next) => {
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
  let result = newItem.save()
  res.status(200).json({status: 'success'})
}

// module.exports.update = (req, res, next) => {
//   // console.log(req.body.na)
//   let newItem = new projectModel(req.params.id)
//   newItem.code= req.body.data.code
//   newItem.name = req.body.data.name
//   newItem.address = req.body.data.address
//   newItem.type = req.body.data.type
//   let result = newItem.update()
//   // console.log(result)
//   res.status(200).json(result)
// }

// module.exports.delete = (req, res, next) => {
//   let newItem = new projectModel(req.params.id)
//   let result = newItem.delete()
//   res.status(200).json({})
// }

// function prepareData (result) {
//   let data = {
//     header: [{name: 'รหัส'}, {name: 'ชื่อโครงการ'}, {name: 'ประเภท'}],
//     body: ''
//   }
//   data.body = result.map(element => {
//     let id = element.id
//     let data = {}
//     return {
//       key: element.id,
//       show: ['code', 'name', 'type'],
//       items: element
//     }
//   });
//   // console.log(data)
//   return data
// }