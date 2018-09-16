const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkSheetDetail {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.work_sheet_id
    this.time
    this.name
    this.amount
    this.unit
    this.price
    this.total_price
    this.status
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex('work_sheet_detail').where({work_sheet_id: this.work_sheet_id})
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    // let result = await this.knex('work_group')
    // .where('name', 'like', `%${this.name || ''}%`)
    // .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    // await this.knex.destroy()
    // return result
  }

  async count () {
    // let result = await this.knex('work_group').count('id as count').where(this.getCondition())
    // return result
  }

  async save () {
    let result = await this.knex('work_sheet_detail').insert({
      work_sheet_id: this.work_sheet_id,
      time: this.time,
      name: this.name,
      amount: this.amount,
      unit: this.unit,
      price: this.price,
      total_price: this.total_price,
      status: this.status.toString()
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('work_sheet_detail')
    .where({id: this.id})
    .update({
      amount: this.amount,
      status: this.status
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    // let result = await this.knex('work_group')
    // .where({id: this.id})
    // .del()
    // await this.knex.destroy()
    // return result
  }

  getCondition () {
    let conditions = {}
    // if (this.phone) {
    //   conditions.phone = this.phone
    // }
    return conditions
  }
}