const userModel = require('../Models/userModel')
module.exports =  class User {  
  constructor(id) {
    this.authId = id;
  }

  getUser (id) {
    if (id === 'all') {
      userModel.test()
      return {'name': 'all'}
    } else {
      return {'name': id}
    }
    // 
  }

  getUserDetail () {

  }
}