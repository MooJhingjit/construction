// const util = require('util')
const helpers = require('../Libraries/helpers')
const materialModel = require('../Models/materialModel')

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
          // console.log(index)
          // console.log('-------')
          let leftRight = dataPrice[index].side
          let key = dataPrice[index].color
          let value = dataPrice[index].price
          priceObj[side[leftRight]][key] = value
        }
        return Object.assign({}, {
          id: item.id,
          house_id: item.house_id,
          store_id: item.store_id,
          name: item.name,
          amount: item.amount,
          price: item.price,
        }, priceObj)
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
      newItem.amount = item.amount
      newItem.price = item.price
      if (oldItem && newItem.id) {
        isUpdate = true
        await newItem.updateMaterial()
        materialId = item.id
      } else {
        materialId = await newItem.save()
        materialId = materialId[0]
      }
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

async function cleanData (inputs) {
  let item = new materialModel()
  if (inputs.houseId) {
    item.house_id = inputs.houseId
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