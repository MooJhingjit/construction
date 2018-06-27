
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
    this.order_type
    this.date_start
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex.select('ordering.*', 'store.name as storeName')
    .from('ordering')
    .leftJoin('store', function() {
      this.on('store.id', '=', 'ordering.store_id')
    })
    .where({'ordering.contract_code': this.contract_code})
    return result
  }

  async getAllData () {
    let result = await this.knex('ordering')
    .where(this.getCondition())
    // .where('name', 'like', `%${this.name || ''}%`)
    // .orWhere('type', 'like', `%${this.name || ''}%`)
    // .orWhere('type', 'like', `%${this.name || ''}%`)
    // .orWhere('type', 'like', `%${this.name || ''}%`)

    .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    return result
  }

  async count () {
    let result = await this.knex('ordering').count('id as count').where(this.getCondition())
    return result
  }

  async save () {
    let result = await this.knex('ordering').insert({
      store_id: this.store_id,
      contract_code: this.contract_code,
      total_price: this.total_price,
      amount: this.amount,
      status: this.status,
      order_type: this.order_type,
      date_start: this.date_start
    })
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    if (this.order_type) {
      conditions.order_type = this.order_type
    }
    return conditions
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