const helpers = require('../Libraries/helpers')
const userModel = require('../Models/userModel')

module.exports.getAppResource = (req, res, next) => {
  let userData = helpers.getUserAuth(req.headers['authorization'])
  let user = new userModel(userData.id)
  user.getUser((result) => {
    let obj = {
      userData: {
         'id': result[0].id,
         'name': result[0].name,
         'email': result[0].email,
         'username': result[0].username,
         'phone': result[0].phone,
         'address': result[0].address,
         'position': result[0].position
      }
    }
    
    res.status(200).json(obj)
  })
}