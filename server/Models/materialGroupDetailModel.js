const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class MaterialGroupDetail {  
  constructor(id = '') {
    this.id = id
    this.material_group_id
    this.material_id
    this.amount
  }

  getData () {
    return db.query(`SELECT * FROM material_group_detail WHERE material_group_id = ${this.material_group_id}`)
  }

  getAllData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM material_group_detail ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM material_group_detail ${condition}`)
  }

  save () {
    return db.query('INSERT INTO material_group_detail (id, material_group_id, material_id, amount, created_at) VALUES (?, ?, ?, ?, ?)',
    [
      null,
      this.material_group_id,
      this.material_id,
      this.amount,
      helpers.getCurrentTime('sql')
    ])
  }

  update () {
    var sql = `UPDATE material_group_detail SET 
    material_group_id = ?,
    material_id = ?,
    amount = ?,
    created_at = ?
    WHERE id = ?
    `;
    return db.query(sql, [this.material_group_id, this.material_id, this.amount, helpers.getCurrentTime('sql'), this.id],);
  }

  delete () {
    return db.query(`DELETE FROM material_group_detail WHERE material_group_id = ?`, [this.material_group_id]);
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