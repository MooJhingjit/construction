const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class project {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.code
    this.name
    this.address
    this.type
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex('project').where({id: this.id})
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    let result = await this.knex('project').where(this.getCondition())
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('project').count('id as count').where(this.getCondition())
    // await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('project').insert({
      code: this.code,
      name: this.name,
      address: this.address,
      type: this.type,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('project')
    .where({id: this.id})
    .update({
      code: this.code,
      name: this.name,
      address: this.address,
      type: this.type,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('project')
    .where({id: this.id})
    .del()
    await this.knex.destroy()
    return result
  }

  async getStat () {
    let result = await this.knex.select('created_at').from('project')
    await this.knex.destroy()
    return result
  }

  async getAllSelection () {
    let result = await this.knex.select('id', 'name', 'type').from('project').orderBy('created_at', 'desc')
    await this.knex.destroy()
    return result
  }

  async checkDuplicate () {
    let result = await this.knex.select('id')
    .from('project')
    .where(this.getCondition())
    .where('id', '<>', this.id)
    
    await this.knex.destroy()
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    if (this.code) {
      conditions.code = this.code
    }
    if (this.name) {
      conditions.name = this.name
    }
    return conditions
  }
}