
const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class OrderingDetail {
  constructor(id){
    this.knex = knex(db.config)
    this.id = id
    this.order_id
    this.name
    this.price
    this.unit_price
    this.amount
    this.status
  }

  async getData () {
    let result = await this.knex('ordering_detail')
    .where({'order_id': this.order_id})
    return result
  }

  async save () {
    let result = await this.knex('ordering_detail').insert({
      order_id: this.order_id,
      name: this.name,
      price: this.price,
      unit_price: this.unit_price,
      amount: this.amount,
      status: this.status
    })
    return result
  }

  async update () {
    let result = await this.knex('ordering_detail')
    .where({id: this.id})
    .update({
      amount: this.amount,
      price: this.price
    })
    return result
  }

  async delete () {
    let result = await this.knex('ordering_detail')
    .where({order_id: this.order_id})
    .del()
    return result
  }
}