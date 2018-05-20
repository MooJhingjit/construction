const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class WorkOrder {  
  constructor(id = '') {
    this.id = id;
    this.time
    this.pre_order
  }

  
  getData () {
    let sql = `SELECT time, pre_order, work_order.created_at as work_order_date, name, post_order, work_order_detail.created_at as work_order_detail_date  FROM work_order left join work_order_detail on work_order.time = work_order_detail.work_order_time WHERE work_order.time = ${this.time}`
    return db.query(sql)
  }

  getAllData () {
    // let sql = `SELECT time, pre_order, work_order.created_at as work_order_date, name, post_order, work_order_detail.created_at as work_order_detail_date  FROM work_order left join work_order_detail on work_order.time = work_order_detail.work_order_time`
    // let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM work_order`)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM work_order ${condition}`)
  }

  save () {
    return db.query('INSERT INTO work_order (id, time, pre_order, created_at) VALUES (?, ?, ?, ?)',
    [
      null,
      this.time,
      this.pre_order,
      helpers.getCurrentTime('sql')
    ])
  }

  update () {
    var sql = `UPDATE work_order SET 
    time = ?,
    pre_order = ?,
    created_at = ?
    WHERE time = ?
    `;
    return db.query(sql, [this.time, this.pre_order, helpers.getCurrentTime('sql'), this.time],);
  }

  delete () {
    return db.query(`DELETE FROM work_order WHERE id = ?`, [this.id]);
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