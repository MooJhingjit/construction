// const util = require('util')
const helpers = require('../Libraries/helpers')
const materialGroupModel = require('../Models/materialGroupModel')
const materialGroupDetailModel = require('../Models/materialGroupDetailModel')

const getData = (req, res, next) => {
  // let id = req.params.key
  // let project = new projectModel(id)
  // project.getData()
  // .then((result) => {
  //   res.status(200).json(result[0])
  // })
}

async function getAllData (req, res, next) {
  let materialGroup = new materialGroupModel()
  let data = []
  if (req.query.type === 'selection') {
    data = await materialGroup.getDropdownData()
    data = data.map(item => {
      return {
        id: item.id,
        name: item.name
      }
    })
  } else {
    let total = await materialGroup.count()
    materialGroup.name = req.query.main_search
    materialGroup.limit = req.query.limit
    materialGroup.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
    let result = await materialGroup.getAllData()
    if (result) {
      result = await Promise.all(
        result.map(async (item) => {
          let materialGroupDetail = new materialGroupDetailModel()
          materialGroupDetail.material_group_id = item.id
          detail = await materialGroupDetail.getData()
          return {
            id: item.id,
            name: item.name,
            itemCount: detail.length,
            detail: detail || null,
            created: item.created_at
          }
        })
      )
      let config = {
        header: [{name: 'รายการ'}, {name: 'จำนวนวัสดุ'}],
        show: ['name', 'itemCount']
      }
      data = helpers.prepareDataTable(result, total, config)
    }
  }
  res.status(200).json(data)
}

async function getDropDown (req, res, next) {
  let item = new materialGroupModel()
  item.name = req.query.main_search
  let data = await item.getAllSelection()
  data = data.map(item => {
    return {
      key: item.id,
      value: `${item.name}`
    }
  })
  res.status(200).json(data)
}

async function createData (req, res, next) {
  let newItem = new materialGroupModel()
  newItem.name = req.body.data.name
  newItem = await newItem.save()
  let newItemDetail = req.body.data.lists
  result = await Promise.all(
    newItemDetail.map(async item => {
      let newItemDetail = new materialGroupDetailModel()
      newItemDetail.material_group_id = newItem.insertId
      newItemDetail.material_id = item.materialId
      newItemDetail.amount = item.amount
      await newItemDetail.save()
    })
  )
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  // frist update name of group
  let item = new materialGroupModel(req.body.data.id)
  item.name = req.body.data.name
  let result = await item.update()

  // secound clear the old data
  let oldItem = new materialGroupDetailModel()
  oldItem.material_group_id = req.body.data.id
  if (req.body.data.houseId !== null) {
    oldItem.house_id = req.body.data.houseId
  }
  await oldItem.delete()
  
  let newItem = req.body.data.lists
  newItem.map(item => {
    let newItem = new materialGroupDetailModel()
    newItem.material_group_id = req.body.data.id
    newItem.material_id = item.materialId
    newItem.amount = item.amount
    newItem.house_id = item.houseId
    newItem.save()
  })
  
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new materialGroupModel(req.params.id)
  await item.delete()
  let itemDetail = new materialGroupDetailModel()
  itemDetail.material_group_id = req.params.id
  let result = await itemDetail.delete()
  res.status(200).json(result)
}

async function getMaterialByGroup (groupId, houseId) {
  let materials = new materialGroupDetailModel()
  materials.material_group_id = groupId
  materials.house_id = houseId
  let result = await materials.getMaterialByGroup()
  return result
}

module.exports.getDropDown = getDropDown
module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
module.exports.getMaterialByGroup = getMaterialByGroup
