// const WorkSheetCore = require('../Cores/workSheet.js')
const workSheetModel = require('../Models/workSheetModel')
module.exports.getSummary = async (projectId, technicianId, type) => {
  let item = new workSheetModel()
  item.project_id = projectId
  let resObj = await item.getSummary(technicianId, type)
  let objArr = {}
  // console.log(resObj)
  resObj.map((item) => {
    let key = `${item.project_id}_${item.technician_id}_${item.is_extra}`
    if (objArr[key] === undefined) {
      objArr[key] = []
      objArr[key].push({
        date: item.updated_at,
        projectName: item.projectName,
        technicianName: item.technicianName,
        is_extra: item.is_extra,
        total: item.total_price,
      })
    } else {
      objArr[key][0].total = parseInt(objArr[key][0].total) + parseInt(item.total_price)
    }
  })
  
  return objArr
}
