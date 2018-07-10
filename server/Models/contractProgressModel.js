
const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class contractProgress {
  constructor(code){
    this.knex = knex(db.config)
    this.contract_code = code
    this.time
    this.order
    this.order_all
    // this.order_condition
    this.name
    this.start_date
    this.end_date
    this.real_date
    this.delay
    this.condition
    this.status
  }

  async getData () { // with matert
    let result = await this.knex('contract_progress')
    .where({contract_code: this.contract_code})
    .orderBy('time', 'asc')
    .orderBy('order', 'asc')
    return result
  }

  async getAllData () {
    
  }

  async startWorking () {
    let result = await this.knex('contract_progress')
    .where({contract_code: this.contract_code})
    .where({condition: this.condition})
    return result
  }

  async save () {
    let result = await this.knex('contract_progress').insert({
      contract_code: this.contract_code,
      time: this.time,
      order_all: this.order_all,
      order: this.order,
      // order_condition: this.order_condition,
      name: this.name,
      start_date: this.start_date,
      end_date: this.end_date,
      real_date: this.real_date,
      delay: this.delay,
      condition: this.condition,
      status: this.status
    })
    return result
  }

  async updateDate () {
    let result = await this.knex('contract_progress')
    .update({
      // start_date: this.start_date,
      real_date: this.real_date,
      delay: this.delay
    })
    .where({id: this.id})
    return result
  } 

  async getLastProgress () {
    let result = await this.knex('contract_progress')
    .where({status: 'ip'})
    return result
  }
}