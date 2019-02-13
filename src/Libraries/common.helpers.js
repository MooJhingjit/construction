import config from '@Config/app.config'
import moment from 'moment-timezone'
moment().tz('Asia/Bangkok').format()

const SET_STORAGEITEM = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item))
  return true
}

const GET_STORAGEITEM = (key) => {
  let item = null
  if (localStorage.getItem(key)) {
    item = localStorage.getItem(key)
  }
  return item
}

const REMOVE_STORAGEITEM = (key) => {
  return localStorage.removeItem(key)
}

const GET_FULLAPI = (path, queryString) => {
  let params = ''
  let endPoint = config.api.apiEndPoint
  if (queryString !== undefined && queryString !== null) {
    params = '?' + queryString
  }
  return endPoint.concat(path) + params
}

const GET_DATETHAI = (date) => {
  let dd = ''
  let mm = ''
  let yyyy = ''
  let dateVal = moment()
  // let now = new Date()
  // let thday = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']
  let thmonth = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
  if (date !== 'now') {
    dateVal = moment(date)
  }
  dd = dateVal.date()
  mm = thmonth[dateVal.month()]
  yyyy = dateVal.year() + 543
  return `${dd} ${mm} ${yyyy}`
}

export default {
  SET_STORAGEITEM,
  GET_STORAGEITEM,
  REMOVE_STORAGEITEM,
  GET_FULLAPI,
  GET_DATETHAI
}
