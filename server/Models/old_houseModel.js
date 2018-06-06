const helpers = require('../Libraries/helpers')
const database = require('./databaseModel')
const db = new database()

module.exports =  class House {  
  constructor(id = '') {
    this.id = id;
    this.plan
    this.name
    this.type
    this.tile
    this.garage
    this.stair
    this.color
    this.limit = 5
    this.offset = 0
  }

  getData () {
    // return db.query(`SELECT * FROM project WHERE id = ${this.id}`)
  }

  getAllData () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT * FROM house ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  getAllSelection () {
    return db.query(`SELECT id, name, plan, garage FROM house ORDER BY id`)
  }

  count () {
    let condition = this.getCondition('allData')
    return db.query(`SELECT count(id) as count FROM house ${condition}`)
  }

  save () {
    return db.query('INSERT INTO house (id, plan, name, type, tile, garage, stair, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      null,
      this.plan,
      this.name,
      this.type,
      this.tile,
      this.garage,
      this.stair,
      this.color,
      helpers.getCurrentTime('sql')
    ])
  }

  update () {
    var sql = `UPDATE house SET 
    plan = ?,
    name = ?,
    type = ?,
    tile = ?,
    garage = ?,
    stair = ?,
    color = ?,
    created_at = ?
    WHERE id = ?
    `;
    return db.query(sql, [this.plan, this.name, this.type, this.tile, this.garage, this.stair, this.color, helpers.getCurrentTime('sql'), this.id]);
  }

  delete () {
    return db.query(`DELETE FROM house WHERE id = ?`, [this.id]);
  }

  getCondition (actionType) {
    let condition = 'WHERE'
    if (this.name || this.type) {
      if (this.name) {
        condition += ` name like "%${this.name}%"`
      }
      if (this.type) {
        condition += ` type = "${this.type}"`
      }
    } else {
      condition += ` 1`
    }
    return condition
  }
}