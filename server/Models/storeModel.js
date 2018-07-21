const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Store {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.name
    this.type
    this.contact
    this.fax
    this.tel
    this.address
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex('store').where({id: this.id})
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    let result = await this.knex('store')
    .where('name', 'like', `%${this.name || ''}%`)
    .orWhere('type', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('store').count('id as count').where(this.getCondition())
    // await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('store').insert({
      name: this.name,
      type: this.type,
      contact: this.contact,
      fax: this.fax,
      tel: this.tel,
      address: this.address,
      created_at: helpers.getCurrentTime('sql')
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('store')
    .where({id: this.id})
    .update({
      name: this.name,
      type: this.type,
      contact: this.contact,
      fax: this.fax,
      tel: this.tel,
      address: this.address,
      created_at: helpers.getCurrentTime('sql')
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('store')
    .where({id: this.id})
    .del()
    await this.knex.destroy()
    return result
  }
  
  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    
    return conditions
  }
}