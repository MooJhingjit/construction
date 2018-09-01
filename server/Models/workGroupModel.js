const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkGroup {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.name
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex('work_group').where({id: this.id})
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    let result = await this.knex('work_group')
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('work_group').count('id as count').where(this.getCondition())
    return result
  }

  async save () {
    let result = await this.knex('work_group').insert({
      name: this.name
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('work_group')
    .where({id: this.id})
    .update({
      name: this.name
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('work_group')
    .where({id: this.id})
    .del()
    await this.knex.destroy()
    return result
  }

  async getAllSelection () {
    let result = await this.knex.select('id', 'name').from('work_group').orderBy('created_at', 'desc')
    await this.knex.destroy()
    return result
  }

  // async checkDuplicate () {
  //   let result = await this.knex.select('id')
  //   .from('work_group')
  //   .where(this.getCondition())
  //   .where('id', '<>', this.id)
    
  //   await this.knex.destroy()
  //   return result
  // }

  getCondition () {
    let conditions = {}
    if (this.phone) {
      conditions.phone = this.phone
    }
    return conditions
  }
}