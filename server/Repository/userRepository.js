const userModel = require('../Models/userModel')
module.exports =  class User {  
  constructor(id = '') {
    this.authId = id;
  }

  getUser (id) {
    return {'id': this.authId}
  }

  getUserDetail () {

  }
}