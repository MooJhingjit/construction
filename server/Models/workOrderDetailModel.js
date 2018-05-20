const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class WorkOrderDetail {  
  constructor(id = '') {
    this.id = id
    this.work_order_time
    this.name
    this.post_order
  }

  getData () {
    return db.query(`SELECT * FROM work_order_detail WHERE work_order_time = ${this.work_order_time}`)
  }

  // getAllData () {
  //   let condition = this.getCondition('allData')
  //   return db.query(`SELECT * FROM work_order ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  // }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as work_order_detail FROM work_order ${condition}`)
  }

  save () {
    return db.query('INSERT INTO work_order_detail (id, work_order_time, name, post_order, created_at) VALUES (?, ?, ?, ?, ?)',
    [
      null,
      this.work_order_time,
      this.name,
      this.post_order,
      helpers.getCurrentTime('sql')
    ])
  }

  update () {
    var sql = `UPDATE work_order_detail SET 
    work_order_time = ?,
    name = ?,
    post_order = ?,
    created_at = ?
    WHERE id = ?
    `;
    return db.query(sql, [this.work_order_time, this.name, this.post_order, helpers.getCurrentTime('sql'), this.id],);
  }

  delete () {
    return db.query(`DELETE FROM work_order_detail WHERE work_order_time = ?`, [this.work_order_time]);
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