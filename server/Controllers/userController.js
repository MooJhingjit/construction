const helpers = require('../Libraries/helpers')
const userModel = require('../Models/userModel')
const auth = require('./authController.js')

const getData = async (req, res, next) => {
  let userData = helpers.getUserAuth(req.headers['authorization'])
  let id = req.params.key
  if (req.params.key == 'profile') {
    id = userData.id
  }
  let user = new userModel(id)
  let result = await user.getUser()
  res.status(200).json(result[0])
}

const getUserDetail = async (userId) => {
  let user = new userModel(userId)
  let userData = await user.getUser()
  if (!userData) {
    return false
  }
  return {
    'id': userData[0].id,
    'name': userData[0].name,
    'email': userData[0].email,
    'username': userData[0].username,
    'phone': userData[0].phone,
    'address': userData[0].address,
    'position': userData[0].position
 }
}


async function getAllData (req, res, next) {
  let user = new userModel()
  let data = []
  user.status = req.query.status
  user.name = req.query.main_search
  let total = await user.count()
  user.limit = req.query.limit
  user.offset = helpers.getTableoffset(req.query.limit, req.query.currentPage)
  let result = await user.getAllData()
  if (result) {
    let config = {
      header: [{name: 'ผู้ใช้งาน'}],
      show: ['name']
    }
    data = helpers.prepareDataTable(result, total, config)
  }
  res.status(200).json(data)
}

async function createData (req, res, next) {
  let newItem = new userModel()
  newItem.name= req.body.data.name
  newItem.username = req.body.data.username
  newItem.password = await auth.hashPassword(req.body.data.password)
  newItem.email = req.body.data.email
  newItem.phone = req.body.data.phone
  newItem.address = req.body.data.address
  newItem.position = req.body.data.position
  let result = await newItem.save()
  res.status(200).json(result)
}

async function updateData (req, res, next) {
  // console.log(req.body.na)
  let item = new userModel(req.params.id)
  item.name= req.body.data.name
  item.username = req.body.data.username
  // item.password = '123456'
  item.email = req.body.data.email
  item.phone = req.body.data.phone
  item.address = req.body.data.address
  item.position = req.body.data.position
  let result = await item.update()
  // console.log(result)
  res.status(200).json(result)
}

async function deleteData (req, res, next) {
  let item = new userModel(req.params.id)
  let result = await item.delete()
  res.status(200).json({})
}

async function getUserDropdown (req, res, next) {
  let user = new userModel()
  user.position = req.query.type
  let result = await user.getUserDropdown()
  res.status(200).json(result)
}

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData
module.exports.getUserDetail = getUserDetail
module.exports.getUserDropdown = getUserDropdown
