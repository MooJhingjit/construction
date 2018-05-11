const helpers = require('../Libraries/helpers')
const db = require('../Database/index')
db.connect(function(err) {
  if (err) return err
})

module.exports =  class Project {  
  constructor(id = '') {
    this.id = id;
    this.code
    this.name
    this.address
    this.type
  }

  getData (callback) {
    db.query(`SELECT * FROM project WHERE id = ${this.id}`, (err, result) => {
      return callback(result);
    })
    
  }

  getAllData (callback) {
    let condition = this.getCondition('allData')
    db.query(`SELECT * FROM project ${condition}`, (err, result) => {
      return callback(result);
    })
  }

  save () {
    db.query('INSERT INTO project (id, code, name, address, type, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      null,
      this.code,
      this.name,
      this.address,
      this.type,
      helpers.getCurrentTime('sql')
    ],
    function (err, result) {
      console.log(err)
      if (err) return 'err'
      return 'result'
    })
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
    db.query(sql, [this.code, this.name, this.address, this.type, helpers.getCurrentTime('sql'), this.id],function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  delete () {
    let sql = `DELETE FROM project WHERE id = ?`;
    db.query(sql, [this.id],function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
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