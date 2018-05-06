// const userModel = require('../Models/userModel')
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
    this.position
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
    db.query('INSERT INTO user (id, name, username, password, email, phone, address, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.name,
      this.username,
      this.password,
      this.email,
      this.phone,
      this.address,
      this.position
    ],
    function (err, result) {
      console.log(err)
      if (err) return 'err'
      return 'result'
    })
  }

  update () {
    var sql = `UPDATE user SET 
    name = ?,
    username = ?,
    email = ?,
    phone = ?,
    address = ?,
    position = ?
    WHERE id = ?
    `;
    db.query(sql, [this.name, this.username, this.email, this.phone, this.address, this.position, this.id],function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  delete () {
    let sql = `DELETE FROM user WHERE id = ?`;
    db.query(sql, [this.id],function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }
}