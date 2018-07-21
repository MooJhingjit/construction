
const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkOrderPreiod {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id
    this.work_order_time
    this.order
    this.house_id
    this.preiod
    this.preiod_end
    this.condition
  }

  async getData () {
    let result = await this.knex('work_order_preiod')
    .where('work_order_time', this.work_order_time)
    .where('order', this.order)
    // .where('house_id', this.house_id)
    await this.knex.destroy()
    return result
  }

  async getDataByHouseId () {
    let result = await this.knex('work_order_preiod')
    .where('house_id', this.house_id)
    await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('work_order_preiod').insert({
      work_order_time: this.work_order_time,
      order: this.order,
      house_id: this.house_id,
      preiod: this.preiod,
      preiod_end: this.preiod_end,
      condition: this.condition
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('work_order_preiod')
    .where({id: this.id})
    .update({
      work_order_time: this.work_order_time,
      order: this.order,
      house_id: this.house_id,
      preiod: this.preiod,
      preiod_end: this.preiod_end,
      condition: this.condition
    })
    await this.knex.destroy()
    return result
  }

  // async delete () {
  //   let result = await this.knex('work_order_detail')
  //   .where({work_order_time: this.work_order_time})
  //   .del()
  // await this.knex.destroy()
  // return result
  // }
}