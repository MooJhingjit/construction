const knex = require('knex');
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Material {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.house_id
    this.store_id
    this.name
    this.delay
    this.unit
    this.amount
    this.price
  }
  async getData () {
    let result = await this.knex('material')
    // .join('material_price', 'material.id', '=', 'material_price.material_id').select()
    return result
  }

  async getDataById () {
    let result = await this.knex.select().from('material').where({
      id: this.id
    })
    return result
  }

  async getDataPrice (id) {
    let result = await this.knex('material_price')
    .where({'material_id': id})
    return result
  }

  async getDataByAttr () {
    let conditions = {
      store_id: this.store_id
    }
    if (this.house_id) {
      conditions.house_id = this.house_id
    }
    let result = await this.knex.select().from('material').where(conditions)
    return result
  }

  async save () {
    let result = await this.knex('material').insert({
      name: this.name,
      delay: this.delay,
      unit: this.unit,
      house_id: this.house_id,
      store_id: this.store_id,
      amount: this.amount,
      price: this.price,
      created_at: helpers.getCurrentTime('sql')
    })
    return result
  }

  async updateMaterial () {
    let result = await this.knex('material')
    .where({id: this.id})
    .update({
      name: this.name,
      delay: this.delay,
      unit: this.unit,
      house_id: this.house_id,
      store_id: this.store_id,
      amount: this.amount,
      price: this.price,
      created_at: helpers.getCurrentTime('sql')
    })
    return result
  }
  
  async savePrice (obj) {
    let result = await this.knex('material_price').insert({
      material_id: obj.id,
      side: obj.side,
      color: obj.color,
      price: obj.price,
      created_at: helpers.getCurrentTime('sql')
    })
    return result
  }

  async updatePrice (obj) {
    return result
  }

  async delete () {
    let result = await this.knex('material')
    .where({
      house_id: this.house_id,
      store_id: this.store_id
    })
    .del()
    return result
  }

  async clearMaterial (idArr) {
    let conditions = {
      store_id: this.store_id
    }
    if (this.house_id) {
      conditions.house_id = this.house_id
    }
    let result = await this.knex('material')
    .where(conditions)
    .whereNotIn('id', idArr)
    .del()
    return result
  }

  async clearMaterialDetail (idArr) {
    let result = await this.knex('material_price')
    .whereIn('material_id', idArr)
    .del()
    return result
  }

  async getAllSelection () {
    let result = await this.knex.select('id', 'name')
    .from('material')
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc')
    .limit(20).offset(0)
    return result
  }
  
}

// module.exports =  class WorkOrder {  
//   constructor(id = '') {
//     this.id = id;
//     this.name
//     this.amount
//     this.price
//     this.left
//     this.right
//   }

  
//   getData () {
//     // let sql = `SELECT time, pre_order, work_order.created_at as work_order_date, name, post_order, work_order_detail.created_at as work_order_detail_date  FROM work_order left join work_order_detail on work_order.time = work_order_detail.work_order_time WHERE work_order.time = ${this.time}`
//     // return db.query(sql)
//   }

//   getAllData () {
//     // return db.query(`SELECT * FROM work_order`)
//   }

//   count () {
//     // let condition = this.getCondition('allData')
//     // return db.query(`SELECT count(id) as count FROM work_order ${condition}`)
//   }

//   save () {
//     this.knex('material').insert({
//       id: null,
//       name: this.name,
//       amount: this.amount,
//       price: this.price,
//       l_default: this.left,
//       r_default: this.right,
//       titcreated_atle: elpers.getCurrentTime('sql')
//     })
//     // return db.query('INSERT INTO material (id, name, amount, price, l_default, r_default, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
//     // [
//     //   null,
//     //   this.name,
//     //   this.amount,
//     //   this.price,
//     //   this.left,
//     //   this.right,
//     //   helpers.getCurrentTime('sql')
//     // ])
//   }

//   update () {
//     // var sql = `UPDATE work_order SET 
//     // time = ?,
//     // pre_order = ?,
//     // created_at = ?
//     // WHERE time = ?
//     // `;
//     // return db.query(sql, [this.time, this.pre_order, helpers.getCurrentTime('sql'), this.time],);
//   }

//   delete () {
//     // return db.query(`DELETE FROM work_order WHERE id = ?`, [this.id]);
//   }
// }