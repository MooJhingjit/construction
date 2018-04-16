const userModel = require('../Models/userModel')
const db = require('../Database/index')
db.connect(function(err) {
  if (err) return err
})

module.exports =  class User {  
  constructor(id = '') {
    this.id = id;
    this.name
    this.username
    this.password
    this.email
    this.phone
    this.address
  }

  getUser (callback) {
    db.query(`SELECT * FROM user WHERE id = ${this.id}`, (err, result) => {
      return callback(result);
    })
    
  }

  getAllUsers (callback) {
    db.query(`SELECT * FROM user`, (err, result) => {
      return callback(result);
    })
  }

  save () {
    db.query('INSERT INTO user (id, name, username, password, email, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.name,
      this.username,
      this.password,
      this.email,
      this.phone,
      this.address
    ],
    function(err, result) {
      console.log(err)
      if (err) return 'err'
      return 'result'
    })
  }
}