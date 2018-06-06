const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class Project {  
  constructor(id = '') {
    this.id = id;
    this.code
    this.name
    this.address
    this.type
    this.status
    this.limit = 5
    this.offset = 0
  }

  getData () {
    return db.query(`SELECT * FROM project WHERE id = ${this.id}`)
  }

  getAllData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM project ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM project ${condition}`)
  }

  save () {
    return db.query('INSERT INTO project (id, code, name, address, type, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      null,
      this.code,
      this.name,
      this.address,
      this.type,
      helpers.getCurrentTime('sql')
    ])
  }

  update () {
    var sql = `UPDATE project SET 
    code = ?,
    name = ?,
    address = ?,
    type = ?,
    created_at = ?
    WHERE id = ?
    `;
    return db.query(sql, [this.code, this.name, this.address, this.type, helpers.getCurrentTime('sql'), this.id],);
  }

  delete () {
    return db.query(`DELETE FROM project WHERE id = ?`, [this.id]);
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