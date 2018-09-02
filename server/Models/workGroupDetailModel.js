const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkGroupDetail {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id
    this.time
    this.group_id
    this.house_id
    this.name
    this.unit
    this.note
    this.price
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex('work_group_detail')
    .where({group_id: this.group_id, house_id: this.house_id})
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    // let result = await this.knex('work_group_detail')
    // .where('name', 'like', `%${this.name || ''}%`)
    // .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    // await this.knex.destroy()
    // return result
  }

  async count () {
    // let result = await this.knex('work_group_detail').count('id as count').where(this.getCondition())
    // return result
  }

  async save () {
    let result = await this.knex('work_group_detail').insert({
      time: this.time,
      group_id: this.group_id,
      house_id: this.house_id,
      name: this.name,
      unit: this.unit,
      price: this.price,
      note: this.note
    })
    // await this.knex.destroy()
    return result
  }

  async update () {
    // let result = await this.knex('work_group_detail')
    // .where({id: this.id})
    // .update({
    //   name: this.name
    // })
    // // await this.knex.destroy()
    // return result
  }

  async delete () {
    let result = await this.knex('work_group_detail')
    .where(this.getCondition())
    .del()
    await this.knex.destroy()
    return result
  }

  // async deleteGroup () {
  //   let result = await this.knex('work_group_detail')
  //   .where({id: this.id})
  //   .del()
  //   await this.knex.destroy()
  //   return result
  // }

  async getAllSelection () {
    let result = await this.knex.select('id', 'name').from('work_group_detail').orderBy('created_at', 'desc')
    await this.knex.destroy()
    return result
  }

  // async checkDuplicate () {
  //   let result = await this.knex.select('id')
  //   .from('work_group_detail')
  //   .where(this.getCondition())
  //   .where('id', '<>', this.id)
    
  //   await this.knex.destroy()
  //   return result
  // }

  getCondition () {
    let conditions = {}
    if (this.group_id) {
      conditions.group_id = this.group_id
    }
    if (this.house_id) {
      conditions.house_id = this.house_id
    }
    return conditions
  }
}