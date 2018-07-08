const jwt = require('jsonwebtoken');
const helpers = require('../Libraries/helpers')
const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')

const doAuth = async (req, res, next) => {
  let user = {
    username: req.body.data.username,
    password: req.body.data.password,
  }
  let userId = await checkUser(user)
  if (!userId) {
    res.status(401).json({})
    return
  }
  let userJwt = {
    id: userId,
    username: user.username
  }
  let token = await getJwt(userJwt)
  res.status(200).json({token})
}

const checkUser = async (userAuth) => {
  let user = new userModel()
  user.username = userAuth.username
  let userRes = await user.getUserByUsername()
  if (!userRes.length) {
    return false
  }
  const match = await bcrypt.compare(userAuth.password, userRes[0].password);
  if(!match) {
    return false
  }
  return userRes[0].id
}
const hashPassword = async (myPlaintextPassword) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(myPlaintextPassword, salt)
  return hash
}

const getJwt = async (user) => {
  let token = await jwt.sign({user}, 'secretkey')
  return token
}
module.exports.doAuth = doAuth
module.exports.hashPassword = hashPassword