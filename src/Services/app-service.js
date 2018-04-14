import axios from 'axios'
import commonHelper from '@Libraries/common.helpers'

const createHeader = () => {
  let appToken = commonHelper.GET_STORAGEITEM('app_token')
  let instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${appToken.substring(1, appToken.length - 1)}`
    }
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

const postData = (obj, callback) => {
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

export default {
  getResource,
  postData
}
