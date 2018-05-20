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
  // let materialGroupDetail = new materialGroupDetailModel()
  let data = []
  // project.status = req.query.status
  // project.name = req.query.main_search
  let total = await materialGroup.count()
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
  let item = new materialGroupModel(req.body.data.id)
  item.name = req.body.data.name
  let result = await item.update()

  let oldItem = new materialGroupDetailModel()
  oldItem.material_group_id = req.body.data.id
  await oldItem.delete()
  let newItem = req.body.data.lists
  newItem.map(item => {
    let newItem = new materialGroupDetailModel()
    newItem.material_group_id = req.body.data.id
    newItem.material_id = item.materialId
    newItem.amount = item.amount
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

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData