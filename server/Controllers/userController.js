// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
const helpers = require('../Libraries/helpers')
const userModel = require('../Models/userModel')
const getData = (req, res, next) => {
  let userData = helpers.getUserAuth(req.headers['authorization'])
  let id = req.params.key
  if (req.params.key == 'profile') {
    id = userData.id
  }
  let user = new userModel(id)
  user.getUser((result) => {
    res.status(200).json(result[0])
  })
}

async function getAllData (req, res, next) {
  // let user = new userModel()
  // user.getAllUsers((result) => {
  //   res.status(200).json(result)
  // })
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
  // console.log(req.body.na)
  let newItem = new userModel()
  newItem.name= req.body.data.name
  newItem.username = req.body.data.username
  newItem.password = '123456'
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

module.exports.getData = getData
module.exports.getAllData = getAllData
module.exports.createData = createData
module.exports.updateData = updateData
module.exports.deleteData = deleteData