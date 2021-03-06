const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkOrder {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.project_type_id
    this.time
    // this.pre_order
  }

  // async getData () {
  //   let result = await this.knex.select('time', 'pre_order', 'work_order.created_at as work_order_date', 'work_order_detail.name as name', 'post_order',
  //   'work_order_detail.created_at as work_order_detail_date',
  //   'material_group.name as material_group_name', 'material_group.id as material_group_id'
  //   )
  //   .from('work_order')
  //   .leftJoin('work_order_detail', 'work_order.time', 'work_order_detail.work_order_time')
  //   .leftJoin('material_group', 'material_group .id', 'work_order_detail.post_order')
  //   .where({'work_order.time': this.time})
  //   .orderBy('work_order_detail.id', 'asc')
  // await this.knex.destroy()
  // return result
  // }

  async getData () {
    let result = await this.knex('work_order')
    .where(this.getCondition())
    await this.knex.destroy()
    return result
  }


  async getAllData () {
    let result = await this.knex('work_order').where(this.getCondition())
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('work_order').count('id as count').where(this.getCondition())
    // await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('work_order').insert({
      time: this.time,
      project_type_id: this.project_type_id,
      // created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('work_order')
    .where({time: this.time})
    .update({
      time: this.time,
      project_type_id: this.project_type_id,
      // created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('work_order')
    .where({id: this.id})
    .del()
    await this.knex.destroy()
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    if (this.project_type_id) {
      conditions.project_type_id = this.project_type_id
    }
    if (this.time) {
      conditions.time = this.time
    }
    if (this.id) {
      conditions.id = this.id
    }
    return conditions
  }
}

// const helpers = require('../Libraries/helpers')
// const database = require('./databaseModel')
// const db = new database()

// module.exports =  class WorkOrder {  
//   constructor(id = '') {
//     this.id = id;
//     this.time
//     this.pre_order
//   }

  
//   getData () {
//     let sql = `SELECT time, pre_order, delay, work_order.created_at as work_order_date, name, post_order, work_order_detail.created_at as work_order_detail_date  FROM work_order left join work_order_detail on work_order.time = work_order_detail.work_order_time WHERE work_order.time = ${this.time}`
//     return db.query(sql)
//   }

//   getAllData () {
//     return db.query(`SELECT * FROM work_order`)
//   }

//   count () {
//     let condition = this.getCondition('allData')
//     return db.query(`SELECT count(id) as count FROM work_order ${condition}`)
//   }

//   save () {
//     return db.query('INSERT INTO work_order (id, time, pre_order, created_at) VALUES (?, ?, ?, ?)',
//     [
//       null,
//       this.time,
//       this.pre_order,
//       helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
//     ])
//   }

//   update () {
//     var sql = `UPDATE work_order SET 
//     time = ?,
//     pre_order = ?,
//     created_at = ?
//     WHERE time = ?
//     `;
//     return db.query(sql, [this.time, this.pre_order, helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss'), this.time],);
//   }

//   delete () {
//     return db.query(`DELETE FROM work_order WHERE id = ?`, [this.id]);
//   }

//   getCondition (actionType) {
//     let condition = 'WHERE'
//     if (this.name || this.status) {
//       if (this.name) {
//         condition += ` name like "%${this.name}%"`
//       }
//       if (this.status) {
//         condition += ` status = "${this.status}"`
//       }
//     } else {
//       condition += ` 1`
//     }
//     return condition
//   }
// }