
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
    this.note
    this.date_start
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex.select('ordering.*', 'store.name as storeName', 'store.type as storeType')
    .from('ordering')
    .leftJoin('store', function() {
      this.on('store.id', '=', 'ordering.store_id')
    })
    .where({'ordering.contract_code': this.contract_code})
    .where('ordering.status', '!=', 'pending')
    return result
  }

  async getStat () {
    let result = await this.knex.select('*')
    .from('ordering')
    .where({'order_type': this.order_type})
    .where('status', '!=', 'pending')
    .orderBy('date_start', 'asc')
    return result
  }

  async getAllData () {
    let result = await this.knex
    .select('contract_code')
    .count('contract_code as amount')
    .from('ordering')
    // .where(this.getCondition())
    .where('contract_code', 'like', `%${this.contract_code || ''}%`)
    .where('status', '!=', 'pending')
    .groupBy('contract_code')
    // .orderBy('contract_code', 'desc').limit(this.limit).offset(this.offset)
    return result
  }

  async getLastOrderByType () {
    let result = await this.knex('ordering')
    .where('order_type', this.order_type)
    .where('status', 'wait')
    .orderBy('id', 'desc').limit(this.limit)
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
      note: this.note,
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

  async update () {
    let result = await this.knex('ordering')
    .where({id: this.id})
    .update({
      total_price: this.total_price,
      date_start: this.date_start,
      status: this.status
    })
    return result
  }

  async delete () {
    let result = await this.knex('ordering')
    .where({id: this.id})
    .del()
    return result
  }

  async checkUpdateOrdering () {
    let result = await this.knex('ordering')
    .update({
      date_start: this.date_start,
      status: this.status
    })
    .where('date_start', '<=', this.date_start)
    .where('status', 'pending')
    return result
  }
}