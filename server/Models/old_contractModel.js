const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class Contract {  
  constructor(id = '') {
    this.id = id;
    this.code
    this.project_id
    this.contract_type
    this.plan
    this.house_id
    this.price
    this.quarter
    this.date_start
    this.paid
    this.status
    this.limit
    this.offset
  }

  getData () {
    return db.query(`SELECT * FROM contract WHERE code = '${this.code}'`)
  }

  getAllData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM contract ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM contract ${condition}`)
  }

  save () {
    return db.query(
      'INSERT INTO contract (id, code, project_id, contract_type, plan, house_id, price, quarter, date_start, paid, status, created_at)'
      + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.code,
      this.project_id,
      this.contract_type,
      this.plan,
      this.house_id,
      this.price,
      this.quarter,
      this.date_start,
      this.paid,
      this.status,
      helpers.getCurrentTime('sql')
    ])
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