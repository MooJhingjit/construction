const helpers = require('../Libraries/helpers')
const workSheetDetailModel = require('../Models/workSheetDetailModel')

// const getData = (req, res, next) => {
  // let id = req.params.key
  // let items = new workGroupModel(id)
  // items.getData()
  // .then((result) => {
  //   res.status(200).json(result[0])
  // })
// }

async function getAllData (req, res, next) {
  // let items = new workGroupModel()
  // let data = []
  // items.name = req.query.main_search
  // let total = await items.count()
  // items.limit = req.query.limit
  // items.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  // let result = await items.getAllData()
  // if (result) {
  //   let config = {
  //     header: [{name: 'หมวดงาน'}],
  //     show: ['name']
  //   }
  //   data = helpers.prepareDataTable(result, total, config)
  // }
  // res.status(200).json(data)
}

async function createData (req, res, next) {
  // let newItem = new workGroupModel()
  // newItem.name = req.body.data.name
  // let result = await newItem.save()
  // res.status(200).json(result)
}

async function updateData (req, res, next) {
  // let groupId = req.params.id
  // let houseId = req.body.data.houseId
  // await clearOldOne(groupId, houseId)
  // let itemLists = req.body.data.itemLists
  // let result = await saveNewOne(groupId, houseId, itemLists)
  // res.status(200).json(result)
}



// function -------------------------------------------

const getData = async (groupId) => {
  let item = new workSheetDetailModel()
  item.work_sheet_id = groupId
  let res = await item.getData()
  res.map((item) => {
    item.status = parseInt(item.status)
  })
  return res
}

// const clearOldOne = async (groupId, houseId) => {
//   let item = new workSheetDetailModel()
//   item.group_id = groupId
//   item.house_id = houseId
//   let res = await item.delete()
//   return res
// }

const saveNewOne = async (workSheetId, obj) => {
  let model = new workSheetDetailModel()
  let totalPrice = 0
  let res = await Promise.all(
    obj.map( async (item) => {
      totalPrice = parseFloat(item.price) * parseInt(item.unit)
      model.work_sheet_id = workSheetId
      model.name = item.name
      model.unit = item.unit
      model.price = item.price
      model.total_price = totalPrice
      model.status = item.status
      await model.save()
    })
  )
  return res
}

const deleteData = async (groupId) => {
  // let item = new workSheetDetailModel()
  // item.group_id = groupId
  // let res = await item.delete()
  // return res
}

module.exports.getData = getData
// module.exports.getDropDown = getDropDown
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
module.exports.saveNewOne = saveNewOne


