const helpers = require('../Libraries/helpers')
const ordering = require('./orderingController.js')
const user = require('./userController.js')
const getAppResource = async (req, res, next) => {
  let appResource = {
    logo: `${helpers.hostName(req)}/static/images/logo.png`,
    bg: `${helpers.hostName(req)}/static/images/bg.jpg`
  }
  let userData = {}

  let userAuth = helpers.getUserAuth(req.headers['authorization'])
  if (userAuth) {
    userData = await user.getUserDetail(userAuth.id)
  }
  // await runTasks()
  // let orderingData = await ordering.countOrdering() // alert ordering
  let obj = {
    userData,
    appResource,
    // orderingData
  }
  res.status(200).json(obj)
}
// const runTasks = async () => {
//   // check ordering
//   await ordering.checkOrdering()
//   return
// }

module.exports.getAppResource = getAppResource