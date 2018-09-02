const helpers = require('../Libraries/helpers')
const workGroupDetailModel = require('../Models/workGroupDetailModel')

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
  let groupId = req.params.id
  let houseId = req.body.data.houseId
  await clearOldOne(groupId, houseId)
  let itemLists = req.body.data.itemLists
  let result = await saveNewOne(groupId, houseId, itemLists)
  res.status(200).json(result)
}



// function -------------------------------------------

const getData = async (groupId, houseId) => {
  let item = new workGroupDetailModel()
  item.group_id = groupId
  item.house_id = houseId
  let res = await item.getData()
  return res
}

const clearOldOne = async (groupId, houseId) => {
  let item = new workGroupDetailModel()
  item.group_id = groupId
  item.house_id = houseId
  let res = await item.delete()
  return res
}

const saveNewOne = async (groupId, houseId, itemLists) => {
  let model = new workGroupDetailModel()
  let res = await Promise.all(
    itemLists.map( async (item) => {
      model.time = item.time
      model.group_id = groupId
      model.house_id = houseId
      model.name = item.name
      model.unit = item.unit
      model.price = item.price
      model.note = item.note
      await model.save()
    })
  )
  return res
}

const deleteData = async (groupId) => {
  let item = new workGroupDetailModel()
  item.group_id = groupId
  let res = await item.delete()
  return res
}

module.exports.getData = getData
// module.exports.getDropDown = getDropDown
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
