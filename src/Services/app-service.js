import axios from 'axios'
import commonHelper from '@Libraries/common.helpers'

const createHeader = () => {
  let appToken = commonHelper.GET_STORAGEITEM('app_token')
  let headers = {'Content-Type': 'application/json'}
  if (appToken) {
    headers.Authorization = `bearer ${appToken.substring(1, appToken.length - 1)}`
  }
  let instance = axios.create({
    headers
  })
  return instance
}

const getResource = (obj, callback) => {
  return new Promise((resolve, reject) => {
    let instance = createHeader()
    instance.get(commonHelper.GET_FULLAPI(obj.resourceName, obj.queryString))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const postResource = (obj, callback) => {
  return new Promise((resolve, reject) => {
    let instance = createHeader()
    instance.post(commonHelper.GET_FULLAPI(obj.resourceName), {
      data: obj.data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const putResource = (obj, callback) => {
  return new Promise((resolve, reject) => {
    let instance = createHeader()
    instance.put(commonHelper.GET_FULLAPI(obj.resourceName), {
      data: obj.data
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const deleteResource = (obj, callback) => {
  return new Promise((resolve, reject) => {
    let instance = createHeader()
    instance.delete(commonHelper.GET_FULLAPI(obj.resourceName, obj.queryString))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  getResource,
  postResource,
  putResource,
  deleteResource
}
