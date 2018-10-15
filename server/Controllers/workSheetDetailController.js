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

async function updateData (req, res, next) { // from worksheet page (checkbox update one)
  let id = req.params.id
  let obj = {
    technicianId: req.body.data.technician,
    amount: req.body.data.amount,
    status: req.body.data.status,
  }
  obj.total_price = parseFloat(obj.amount) * parseFloat(req.body.data.price)
  let result = await updateOldOne(id, obj)
  res.status(200).json(result)
}



// function -------------------------------------------

const getData = async (groupId, technicianId) => {
  let item = new workSheetDetailModel()
  item.work_sheet_id = groupId
  // item.technician_id = technicianId
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

const saveNewOne = async (workSheetId, obj, isExtra, technicianId) => {
  let model = new workSheetDetailModel()
  let totalPrice = 0
  let res = await Promise.all(
    obj.map( async (item) => {
      if (isExtra) {
        item.status = 1
        model.is_extra = 1
      }
      totalPrice = parseFloat(item.price) * parseInt(item.amount)
      model.work_sheet_id = workSheetId
      model.technician_id = (item.status === 1) ? technicianId : null
      model.time = item.time
      model.name = item.name
      model.amount = item.amount
      model.unit = item.unit
      model.price = item.price
      model.total_price = totalPrice
      model.note = item.note
      model.status = item.status
      await model.save()
    })
  )
  return res
}

const updateOldOne = async (itemId, obj) => {
  let model = new workSheetDetailModel(itemId)
  model.status = obj.status
  if (obj.has_rejected === 0 || obj.has_rejected === 1) {
    model.has_rejected = obj.has_rejected
  }
  if (obj.has_rejected === 1) {
    model.technician_id = null
  } else {
    model.technician_id = obj.technicianId
  }
  if (obj.amount) {
    model.amount = obj.amount
  }
  if (obj.is_extra) {
    model.price = obj.price
    model.total_price = obj.total_price
  }
  if (obj.total_price) {
    model.total_price = obj.total_price
  }
  model.updated_at = helpers.getCurrentTime('sql')
  // if (obj.price) {
  //   model.price = obj.price
  // }
  let res = await model.update()
  return res
}

const getStat = async (statType) => {

  let obj = {
    config: {
      type: 'bar',
      height: '60',
      barWidth: 6,
      barSpacing: 5,
      tooltipFormat: '<span style="color: {{color}}">&#9679;</span>{{offset:offset}} <br/>{{value:value}} รายการ'
    }
  }
  let model = new workSheetDetailModel()
  let statObj = await model.getStat(statType)
  let stat = []
  
  statObj.map((item) => {
    // console.log(item.date)
    let date = helpers.getDate(item.date, 'YYYY-MM-DD')
    // console.log(date)
    // console.log('------')
    if (stat[date]) {
      stat[date] +=  1
    } else {
      stat[date] = 1
    }
  })
  let dataSets = {
    label: [],
    values: []
  }
  let count = 0
  for (key in stat) {
    dataSets.label.push(key)
    dataSets.values.push(stat[key])
    count += stat[key]
  } 
  // console.log(dataSets)
  if (statType === 'submit') {
    obj.data = {
      name: 'submitJobs',
      barColor: '#4571BB',
      class: 'submit-jobs',
      dataSets,
      count
    }
  }
  if (statType === 'approved') {
    obj.data = {
      name: 'approvePayment',
      barColor: '#4aa000',
      class: 'approve-payment',
      dataSets,
      count
    }
  }
  return obj
}

const prepareChartData = async (type) => {
  let model = new workSheetDetailModel()
  model.is_extra = 1
  let res = await model.getStat()
  let stat = []
  res.map((item) => {
    let date = helpers.getDate(item.date, 'YYYY-MM-DD')
    
    if (stat[date]) {
      stat[date] +=  1
    } else {
      stat[date] = 1
    }
  })
  let dataSets = {
    date: [],
    data: []
  }
  for (key in stat) {
    dataSets.date.push(key)
    dataSets.data.push(stat[key])
  }
  return dataSets
}

module.exports.getData = getData
module.exports.prepareChartData = prepareChartData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.getStat = getStat
module.exports.saveNewOne = saveNewOne
module.exports.updateOldOne = updateOldOne


