import config from '@Config/app.config'

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
  // if (queryString !== undefined) {
  //   params = '?' + queryString
  // }
  return endPoint.concat(path) + params
}

export default {
  SET_STORAGEITEM,
  GET_STORAGEITEM,
  REMOVE_STORAGEITEM,
  GET_FULLAPI
}
