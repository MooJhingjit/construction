// const userModel = require('../Models/userModel')
const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

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
    this.limit = 5
    this.offset = 0
  }

  getUser () {
    return db.query(`SELECT * FROM user WHERE id = ${this.id}`)
  }

  getUserByUsername () {
    return db.query(`SELECT username, pa FROM user WHERE username = ${this.username}`)
  }

  getAllData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM user ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM user ${condition}`)
  }

  
  save () {
    return db.query('INSERT INTO user (id, name, username, password, email, phone, address, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.name,
      this.username,
      this.password,
      this.email,
      this.phone,
      this.address,
      this.position
    ])
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
    `
    return db.query(sql, [this.name, this.username, this.email, this.phone, this.address, this.position, this.id]);
  }

  delete () {
    let sql = `DELETE FROM user WHERE id = ?`;
    return db.query(sql, [this.id]);
  }

  getCondition (actionType) {
    let condition = 'WHERE'
    if (this.name || this.status) {
      if (this.name) {
        condition += ` name like "%${this.name}%"`
      }
    } else {
      condition += ` 1`
    }
    return condition
  }
}