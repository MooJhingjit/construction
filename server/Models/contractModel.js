const helpers = require('../Libraries/helpers')
const db = require('../Database/index')
db.connect(function(err) {
  if (err) return err
})

module.exports =  class Project {  
  constructor(id = '') {
    this.id = id;
    this.code
    this.project_id
    this.contract_type
    this.plan
    this.house_temp
    this.price
    this.quarter
    this.date_start
    this.paid
    this.status
  }

  // getData (callback) {
  //   db.query(`SELECT * FROM project WHERE id = ${this.id}`, (err, result) => {
  //     return callback(result);
  //   })
    
  // }

  // getAllData (callback) {
  //   let condition = this.getCondition('allData')
  //   db.query(`SELECT * FROM project ${condition}`, (err, result) => {
  //     return callback(result);
  //   })
  // }

  save () {
    db.query(
      'INSERT INTO contract (id, code, project_id, contract_type, plan, house_temp, price, quarter, date_start, paid, status, created_at)'
      + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.code,
      this.project_id,
      this.contract_type,
      this.plan,
      this.house_temp,
      this.price,
      this.quarter,
      this.date_start,
      this.paid,
      this.status,
      helpers.getCurrentTime('sql')
    ],
    function (err, result) {
      console.log(err)
      if (err) return 'err'
      return result
    })
  }

  // update () {
  //   var sql = `UPDATE project SET 
  //   code = ?,
  //   name = ?,
  //   address = ?,
  //   type = ?,
  //   created_at = ?
  //   WHERE id = ?
  //   `;
  //   db.query(sql, [this.code, this.name, this.address, this.type, helpers.getCurrentTime('sql'), this.id],function (err, result) {
  //     if (err) throw err;
  //     console.log(result.affectedRows + " record(s) updated");
  //   });
  // }

  // delete () {
  //   let sql = `DELETE FROM project WHERE id = ?`;
  //   db.query(sql, [this.id],function (err, result) {
  //     if (err) throw err;
  //     console.log(result.affectedRows + " record(s) updated");
  //   });
  // }

  // getCondition (actionType) {
  //   let condition = 'WHERE'
  //   if (this.name || this.status) {
  //     if (this.name) {
  //       condition += ` name like "%${this.name}%"`
  //     }
  //     if (this.status) {
  //       condition += ` status = "${this.status}"`
  //     }
  //   } else {
  //     condition += ` 1`
  //   }
  //   return condition
  // }
}