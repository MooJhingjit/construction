// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
const helpers = require('../Libraries/helpers')
const userModel = require('../Models/userModel')
module.exports.getUser = (req, res, next) => {
  let userData = helpers.getUserAuth(req.headers['authorization'])
  let user = new userModel(userData.id)
  user.getUser((result) => {
    res.status(200).json(result[0])
  })
}

module.exports.getAllUsers = (req, res, next) => {
  let user = new userModel()
  user.getAllUsers((result) => {
    res.status(200).json(result)
  })
}

module.exports.create = (req, res, next) => {
  // console.log(req.body.na)
  let newUser = new userModel()
  newUser.name= req.body.data.name
  newUser.username = req.body.data.username
  newUser.password = '123456'
  newUser.email = req.body.data.email
  newUser.phone = req.body.data.phone
  newUser.address = req.body.data.address
  newUser.position = req.body.data.position
  let result = newUser.save()
  // console.log(result)
  res.status(200).json(result)
}

module.exports.update = (req, res, next) => {
  // console.log(req.body.na)
  let user = new userModel(req.params.id)
  user.name= req.body.data.name
  user.username = req.body.data.username
  // user.password = '123456'
  user.email = req.body.data.email
  user.phone = req.body.data.phone
  user.address = req.body.data.address
  user.position = req.body.data.position
  let result = user.update()
  // console.log(result)
  res.status(200).json(result)
}

module.exports.delete = (req, res, next) => {
  let user = new userModel(req.params.id)
  let result = user.delete()
  res.status(200).json({})
}

module.exports.addUser = () => {
  console.log('addUser')
}