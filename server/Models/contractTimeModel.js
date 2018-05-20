const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class ContractTime {  
  constructor(id = '') {
    this.id = id;
    this.contract_code
    this.time
    this.price
    this.is_success
    this.date_start
    this.date_end
  }

  getData () {
    return db.query(`SELECT * FROM project WHERE id = ${this.id}`)
  }

  getAllData () {
    return db.query(`SELECT * FROM contract_times`)
  }

  save () {
    return db.query(
      'INSERT INTO contract_times (id, contract_code, time, price, is_success, date_start, date_end, created_at)'
      + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.contract_code,
      this.time,
      this.price,
      this.is_success,
      this.date_start,
      this.date_end,
      helpers.getCurrentTime('sql')
    ])
  }

  delete () {
    return db.query(`DELETE FROM contract_times WHERE id = ?`, [this.id]);
  }
}