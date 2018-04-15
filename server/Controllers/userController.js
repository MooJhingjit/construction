// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
const userRepository = require('../Repository/userRepository')
module.exports.getUser = (req, res, next) => {
  let user = new userRepository('1')
  let isSuccess = true

  let result = user.getUser(req.params.key)

  if (isSuccess) {
    res.status(200).json(result)
  } else {
    res.status(400).json({'message': 'error'})
  }
}

module.exports.addUser = () => {
  console.log('addUser')
}