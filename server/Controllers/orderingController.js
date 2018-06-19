// const helpers = require('../Libraries/helpers')
const workOrderModel = require('../Models/workOrderModel')
const {getMaterialByGroup} = require('./materialGroupController.js')

async function startOrdering (time, houseId) {
  let pre_order = await getPreOrder(time)
  let materials = await getMaterialByGroup(pre_order, houseId)
  let materialArr = []
  materials.map(item => {
    materialArr.push(item.material_id)
  })
  console.log(materialArr)
}
async function getPreOrder (time) {
  let workOrder = new workOrderModel()
  workOrder.time = time
  workOrder = await workOrder.getData()
  return workOrder[0].pre_order
}
// const getData = (req, res, next) => {
//   let id = req.params.key
//   let project = new projectModel(id)
//   project.getData()
//   .then((result) => {
//     res.status(200).json(result[0])
//   })
// }

// async function getAllData (req, res, next) {
//   let project = new projectModel()
//   let data = []
//   project.status = req.query.status
//   project.name = req.query.main_search
//   let total = await project.count()
//   project.limit = req.query.limit
//   project.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
//   let result = await project.getAllData()
//   if (result) {
//     let config = {
//       header: [{name: 'รหัส'}, {name: 'ชื่อโครงการ'}],
//       show: ['code', 'name']
//     }
//     data = helpers.prepareDataTable(result, total, config)
//   }
//   res.status(200).json(data)
// }

// async function createData (req, res, next) {
//   let newItem = new projectModel()
//   newItem.code= req.body.data.code
//   newItem.name = req.body.data.name
//   newItem.address = req.body.data.address
//   newItem.type = req.body.data.type
//   let result = await newItem.save()
//   res.status(200).json(result)
// }

// async function updateData (req, res, next) {
//   let item = new projectModel(req.params.id)
//   item.code= req.body.data.code
//   item.name = req.body.data.name
//   item.address = req.body.data.address
//   item.type = req.body.data.type
//   let result = await item.update()
//   res.status(200).json(result)
// }

// async function deleteData (req, res, next) {
//   let item = new projectModel(req.params.id)
//   let result = await item.delete()
//   res.status(200).json({})
// }

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
// module.exports.getStat = getStat
// module.exports.getData = getData
// module.exports.getAllData = getAllData
// module.exports.createData = createData
// module.exports.updateData = updateData
// module.exports.deleteData = deleteData
module.exports.startOrdering = startOrdering