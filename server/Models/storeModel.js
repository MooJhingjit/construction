const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class Project {  
  constructor(id = '') {
    this.id = id;
    this.name
    this.type
    this.contact
    this.fax
    this.tel
    this.address
    this.limit = 5
    this.offset = 0
  }

  getData () {
    return db.query(`SELECT * FROM store WHERE id = ${this.id}`)
  }

  getAllData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM store ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM store ${condition}`)
  }

  save () {
    return db.query('INSERT INTO store (id, name, type, contact, fax, tel, address, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.name,
      this.type,
      this.contact,
      this.fax,
      this.tel,
      this.address,
      helpers.getCurrentTime('sql')
    ])
  }

  update () {
    var sql = `UPDATE store SET 
    name = ?,
    type = ?,
    contact = ?,
    fax = ?,
    tel = ?,
    address = ?,
    created_at = ?
    WHERE id = ?
    `;
    return db.query(sql, [this.name, this.type, this.contact, this.fax, this.tel, this.address, helpers.getCurrentTime('sql'), this.id],);
  }

  delete () {
    return db.query(`DELETE FROM store WHERE id = ?`, [this.id]);
  }

  getCondition (actionType) {
    let condition = 'WHERE'
    if (this.name || this.status) {
      if (this.name) {
        condition += ` name like "%${this.name}%"`
      }
      if (this.status) {
        condition += ` status = "${this.status}"`
      }
    } else {
      condition += ` 1`
    }
    return condition
  }
}