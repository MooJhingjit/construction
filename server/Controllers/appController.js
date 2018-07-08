const helpers = require('../Libraries/helpers')
const ordering = require('./orderingController.js')
const user = require('./userController.js')
const getAppResource = async (req, res, next) => {
  let userAuth = helpers.getUserAuth(req.headers['authorization'])
  let userData = await user.getUserDetail(userAuth.id)
  if (!userData) {
    res.status(401).json({})
  }

  await runTasks()
  let orderingData = await ordering.countOrdering() // alert ordering
  let obj = {
    userData,
    orderingData
  }
  res.status(200).json(obj)
}
const runTasks = async () => {
  // check ordering
  await ordering.checkOrdering()
  return
}

module.exports.getAppResource = getAppResource