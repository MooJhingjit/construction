const knex = require('knex');
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class MaterialGroup {  
  constructor(id = '') {
    this.knex = knex(db.config);
    this.id = id
    this.name
    this.limit = 5
    this.offset = 0
  }

  // getData () {
  //   return db.query(`SELECT * FROM material_group WHERE id = ${this.id}`)
  // }
  async getData () {
    let result = await this.knex('material_group')
    .where({id: this.id})
    await this.knex.destroy()
    return result
  }

  // getAllData () {
  //   let condition = this.getCondition('allData')
  //   return db.query(`SELECT * FROM material_group ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  // }
  async getAllData () {
    let result = await this.knex('material_group')
    .where(this.getCondition())
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'asc').limit(this.limit).offset(this.offset)
    await this.knex.destroy()
    return result
  }

  // count () {
  //   let condition = this.getCondition('allData')
  //   return db.query(`SELECT count(id) as count FROM material_group ${condition}`)
  // }
  async count () {
    let result = await this.knex('material_group').count('id as count').where(this.getCondition())
    .where('name', 'like', `%${this.name || ''}%`)
    // await this.knex.destroy()
    return result
  }

  // save () {
  //   return db.query('INSERT INTO material_group (id, name, created_at) VALUES (?, ?, ?)',
  //   [
  //     null,
  //     this.name,
  //     helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
  //   ])
  // }
  async save () {
    let result = await this.knex('material_group').insert({
      name: this.name
    })
    await this.knex.destroy()
    return result
  }


  // update () {
  //   var sql = `UPDATE material_group SET 
  //   name = ?,
  //   created_at = ?
  //   WHERE id = ?
  //   `;
  //   return db.query(sql, [this.name, helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss'), this.id],);
  // }
  async update () {
    let result = await this.knex('material_group')
    .where({id: this.id})
    .update({
      name: this.name
    })
    await this.knex.destroy()
    return result
  }

  // delete () {
  //   return db.query(`DELETE FROM material_group WHERE id = ?`, [this.id]);
  // }
  async delete () {
    let result = await this.knex('material_group')
    .where({id: this.id})
    .del()
    await this.knex.destroy()
    return result
  }

  // getDropdownData () {
  //   let condition = this.getCondition('allData')
  //   return db.query(`SELECT * FROM material_group ORDER BY id `)
  // }
  async getDropdownData () {
    let result = await this.knex('material_group')
    .orderBy('id', 'asc')
    await this.knex.destroy()
    return result
  }

  // getCondition (actionType) {
  //   let condition = 'WHERE'
  //   if (this.name || this.status) {
  //     if (this.name) {
  //       // condition += ` name like "%${this.name}%"`
  //     }
  //     if (this.status) {
  //       // condition += ` status = "${this.status}"`
  //     }
  //   } else {
  //     condition += ` 1`
  //   }
  //   return condition
  // }
  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    return conditions
  }
}