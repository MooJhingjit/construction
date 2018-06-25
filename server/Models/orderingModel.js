
const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Ordering {
  constructor(id){
    this.knex = knex(db.config)
    this.id = id
    this.store_id
    this.contract_code
    this.total_price
    this.amount
    this.status
    this.date_start
  }

  async save () {
    let result = await this.knex('ordering').insert({
      store_id: this.store_id,
      contract_code: this.contract_code,
      total_price: this.total_price,
      amount: this.amount,
      status: this.status,
      date_start: this.date_start
    })
    return result
  }

  // async update () {
  //   let result = await this.knex('order')
  //   .where({id: this.id})
  //   .update({
  //     store_id: this.store_id,
  //     contract_code: this.contract_code,
  //     total_price: this.total_price,
  //     amount: this.amount,
  //     date_start: this.date_start
  //   })
  //   return result
  // }

  // async delete () {
  //   let result = await this.knex('work_order_detail')
  //   .where({work_order_time: this.work_order_time})
  //   .del()
  //   return result
  // }
}