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
  newUser.password = req.body.data.password
  newUser.email = req.body.data.email
  newUser.phone = req.body.data.phone
  newUser.address = req.body.data.address
  let result = newUser.save()
  // console.log(result)
  res.status(200).json(result)
}

module.exports.addUser = () => {
  console.log('addUser')
}