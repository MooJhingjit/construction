const helpers = require('../Libraries/helpers')
const userModel = require('../Models/userModel')
const ordering = require('./orderingController.js')
const getAppResource = async (req, res, next) => {
  let userData = helpers.getUserAuth(req.headers['authorization'])
  let user = new userModel(userData.id)
  let result = await user.getUser()
  let orderingData = await ordering.countOrdering()
  let obj = {
    userData: {
       'id': result[0].id,
       'name': result[0].name,
       'email': result[0].email,
       'username': result[0].username,
       'phone': result[0].phone,
       'address': result[0].address,
       'position': result[0].position
    },
    orderingData
  }
  res.status(200).json(obj)
}

module.exports.getAppResource = getAppResource