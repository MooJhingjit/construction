// const util = require('util')
const helpers = require('../Libraries/helpers')
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
        let dataPrice = await material.getDataPrice(item.id)
        let priceObj = {
          l_default: {},
          r_default: {}
        }
        let side = []
        side['left'] = 'l_default'
        side['right'] = 'r_default'
        for (let index in dataPrice) {
          let leftRight = dataPrice[index].side
          let key = dataPrice[index].color
          let value = dataPrice[index].price
          priceObj[side[leftRight]][key] = value
        }
        let materialGroupDetail = new materialGroupDetailModel()
        materialGroupDetail.material_id = item.id
        materialGroupDetailRes = await materialGroupDetail.getGroupByMaterial()
        let materialGroupArr = []
        materialGroupDetailRes.map(item => {
          materialGroupArr.push(item.id)
        })
        // console.log(materialGroup)
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
        // return Object.assign({}, {
        //   id: item.id,
        //   house_id: item.house_id,
        //   store_id: item.store_id,
        //   name: item.name,
        //   unit: item.unit,
        //   amount: item.amount,
        //   price: item.price,
        // }, priceObj)
        return result
      })
    )
  }
  res.status(200).json(result)
}

async function createData (req, res, next) {
  let itemInputs = req.body.data
  await cleanData(itemInputs)
  result = await Promise.all(
    itemInputs.detail.map(async (item) => {
      let isUpdate = false
      let newItem = new materialModel()
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
          price: item.priceDetail.l_default[lKey],
        }
        createPriceDetail(newItem, priceData, isUpdate)
      }
      for (var rKey in item.priceDetail.r_default) {
        let priceData = {
          id: materialId,
          side: 'right',
          color: rKey,
          price: item.priceDetail.r_default[rKey],
        }
        createPriceDetail(newItem, priceData, isUpdate)
      }
    })
  )
  res.status(200).json({})
}

async function createPriceDetail (instant, obj, isUpdate) {
  let result = await instant.savePrice(obj)
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

// async function deleteMaterail (req, res, next) {
//   let inputs = {
//     houseId: req.query.houseId,
//     storeId: req.query.storeId,
//     detail: []
//   }
//   await cleanData(inputs)
//   res.status(200).json({})
// }

module.exports.getFullMaterial = getFullMaterial
module.exports.createData = createData
module.exports.deleteData = deleteMaterail
module.exports.getDropDown = getDropDown
