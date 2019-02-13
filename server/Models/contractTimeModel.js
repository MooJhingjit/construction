const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Contract {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.contract_code
    this.time
    this.price
    this.is_success
    this.date_start
    this.date_end
  }

  async getData () {
    let result = await this.knex('contract_times')
    .where({contract_code: this.contract_code})
    .orderBy('time', 'asc')
    await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('contract_times').insert({
      contract_code: this.contract_code,
      time: this.time,
      price: this.price,
      is_success: this.is_success,
      date_start: this.date_start,
      date_end: this.date_end,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async updateData () {
    let result = await this.knex('contract_times')
    .where({id: this.id})
    .update({
      is_success: this.is_success
    })
    await this.knex.destroy()
    return result
  }

}