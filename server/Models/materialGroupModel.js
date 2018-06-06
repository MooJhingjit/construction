const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class MaterialGroup {  
  constructor(id = '') {
    this.id = id
    this.name
    this.limit = 5
    this.offset = 0
  }

  getData () {
    return db.query(`SELECT * FROM material_group WHERE id = ${this.id}`)
  }

  getAllData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM material_group ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM material_group ${condition}`)
  }

  save () {
    return db.query('INSERT INTO material_group (id, name, created_at) VALUES (?, ?, ?)',
    [
      null,
      this.name,
      helpers.getCurrentTime('sql')
    ])
  }

  update () {
    var sql = `UPDATE material_group SET 
    name = ?,
    created_at = ?
    WHERE id = ?
    `;
    return db.query(sql, [this.name, helpers.getCurrentTime('sql'), this.id],);
  }

  delete () {
    return db.query(`DELETE FROM material_group WHERE id = ?`, [this.id]);
  }

  getDropdownData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM material_group ORDER BY id `)
  }

  getCondition (actionType) {
    let condition = 'WHERE'
    if (this.name || this.status) {
      if (this.name) {
        // condition += ` name like "%${this.name}%"`
      }
      if (this.status) {
        // condition += ` status = "${this.status}"`
      }
    } else {
      condition += ` 1`
    }
    return condition
  }
}