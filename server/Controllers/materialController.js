// const util = require('util')
const helpers = require('../Libraries/helpers')
const contract = require('./contractController.js')
const materialModel = require('../Models/materialModel')
const materialGroupDetailModel = require('../Models/materialGroupDetailModel')

async function getFullMaterial (req, res, next) {
  let items, result = null
  if (req.query.house && req.params.key) { // get material
    let material = new materialModel()
    material.house_id = req.query.house
    material.store_id = req.params.key
    items = await material.getDataByAttr()
    result = await Promise.all(
      items.map(async item => {
        // don't do as below, the connection will be promise rejections
        // let material = new materialModel()
        // material.house_id = req.query.house
        // material.store_id = req.params.key
        let dataQuantity = await material.getDataQuantity(item.id)
        let priceObj = {
          l_default: {},
          r_default: {}
        }
        // console.log(dataQuantity)
        let side = []
        side['left'] = 'l_default'
        side['right'] = 'r_default'
        for (let index in dataQuantity) {
          let leftRight = dataQuantity[index].side
          let key = dataQuantity[index].color
          let value = dataQuantity[index].price
          priceObj[side[leftRight]][key] = value
        }
        let materialGroupDetail = new materialGroupDetailModel()
        materialGroupDetail.material_id = item.id
        materialGroupDetailRes = await materialGroupDetail.getGroupByMaterial()
        let materialGroupArr = []
        materialGroupDetailRes.map(item => {
          materialGroupArr.push(item.id)
        })
        let result = {
          id: item.id,
          house_id: item.house_id,
          store_id: item.store_id,
          name: item.name,
          delay: item.delay,
          unit: item.unit,
          amount: item.amount,
          price: item.price,
          l_default: priceObj.l_default,
          r_default: priceObj.r_default,
          materialGroup: materialGroupArr
        }
        return result
      })
    )
  }
  res.status(200).json(result)
}

async function createData (req, res, next) {
  let itemInputs = req.body.data
  await cleanData(itemInputs)
  let newItem = new materialModel()
  result = await Promise.all(
    itemInputs.detail.map(async (item) => {
      let isUpdate = false
      newItem.id = item.id || null
      oldItem = await newItem.getDataById()
      newItem.house_id = item.houseId
      newItem.store_id = item.storeId
      newItem.name = item.name
      newItem.delay = item.delay
      newItem.unit = item.unit
      newItem.amount = item.amount || 0
      newItem.price = item.price || 0
      if (oldItem && newItem.id) {
        isUpdate = true
        await newItem.updateMaterial()
        materialId = item.id
      } else {
        materialId = await newItem.save()
        materialId = materialId[0]
      }
      if (item.materialGroup.length) {
        for (var group in item.materialGroup) {
          let groupData = {
            house_id: item.houseId,
            material_id: materialId,
            amount: item.amount,
            material_group_id: item.materialGroup[group],
          }
          createMaterialGroup(groupData)
        }
      }
      
      // materialGroup.
      for (var lKey in item.priceDetail.l_default) {
        let priceData = {
          id: materialId,
          side: 'left',
          color: lKey,
          price: item.priceDetail.l_default[lKey] || 1,
        }
        createPriceDetail(newItem, priceData, isUpdate)
      }
      for (var rKey in item.priceDetail.r_default) {
        let priceData = {
          id: materialId,
          side: 'right',
          color: rKey,
          price: item.priceDetail.r_default[rKey] || 1,
        }
        createPriceDetail(newItem, priceData, isUpdate)
      }
    })
  )
  res.status(200).json({})
}

async function createPriceDetail (instant, obj, isUpdate) {
  let result = await instant.saveQuantity(obj)
  return result
}

async function createMaterialGroup (obj, isUpdate) {
  let instant = new materialGroupDetailModel()
  instant.house_id = obj.house_id
  instant.material_group_id = obj.material_group_id
  instant.material_id = obj.material_id
  instant.amount = obj.amount
  let result = await instant.save(obj)
  return result
}

async function cleanData (inputs) {
  
  let item = new materialModel()
  let materialGroup = new materialGroupDetailModel()
  if (inputs.houseId) {
    item.house_id = inputs.houseId
    materialGroup.house_id = inputs.houseId
  }
  item.store_id = inputs.storeId
  let items = await item.getDataByAttr()
  let id = []
  items.forEach(element => {
    id.push(element.id)
  })
  let inputId = inputs.detail.map(item => {
    return item.id
  })
  item.clearMaterialDetail(id)
  item.clearMaterial(inputId) // not in
  await materialGroup.clearMaterialGroup(id)  
}

async function deleteMaterail (req, res, next) {
  let inputs = {
    houseId: req.query.houseId,
    storeId: req.query.storeId,
    detail: []
  }
  await cleanData(inputs)
  res.status(200).json({})
}

async function getDropDown (req, res, next) {
  let item = new materialModel()
  if (req.query.main_search) {
    item.name = req.query.main_search
  }
  if (req.query.contractId) {
    let contractRes = await contract.getDetailByContractCode(['contract'], req.query.contractId)
    item.house_id = contractRes.contract.house_id
    // if (req.query.contractId === 'null') {
    //   item.house_id = '198PWY'
    // } else {
    //   let contractRes = await contract.getDetailByContractCode(['contract'], req.query.contractId)
    //   item.house_id = contractRes.contract.house_id
    // }
  }
  if (req.query.store) {
    item.store_id = req.query.store
  }
  let data = await item.getAllSelection()
  data = data.map(item => {
    return {
      key: item.id,
      value: `${item.name}`
    }
  })
  res.status(200).json(data)
}

async function getMaterialDetail (idArr) {
  let item = new materialModel()
  let data = await item.getMaterialById(idArr)
  return data
}
async function getDetailById (store, house) {
  let item = new materialModel()
  item.house_id = house
  item.store_id = store
  let data = await item.getData()
  return data
}

module.exports.getFullMaterial = getFullMaterial
module.exports.createData = createData
module.exports.deleteData = deleteMaterail
module.exports.getDropDown = getDropDown
module.exports.getMaterialDetail = getMaterialDetail
module.exports.getDetailById = getDetailById

