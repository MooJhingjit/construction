
const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class contractProcess {
  constructor(code){
    this.knex = knex(db.config)
    this.contract_code = code
    this.time
    this.order
    this.order_condition
    this.name
    this.start_date
    this.real_date
    this.delay
    this.status
  }

  async getData () { // with matert
    let result = await this.knex('contract_process')
    .where({contract_code: this.contract_code})
    .orderBy('time', 'asc')
    .orderBy('order', 'asc')
    return result
  }

  async getAllData () {
    
  }

  async count () {

  }

  async save () {
    let result = await this.knex('contract_process').insert({
      contract_code: this.contract_code,
      time: this.time,
      order: this.order,
      order_condition: this.order_condition,
      name: this.name,
      start_date: this.start_date,
      real_date: this.real_date,
      delay: this.delay,
      status: this.status
    })
    return result
  }

  async updateDate () {
    let result = await this.knex('contract_process')
    .update({
      start_date: this.start_date,
      real_date: this.real_date,
      delay: this.delay
    })
    .where({id: this.id})
    return result
  } 

  async delete () {

  }
}