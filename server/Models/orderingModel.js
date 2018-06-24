const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Ordering {
  constructor(id){
    // this.knex = knex(db.config);
    // this.id = id;
    // this.name
    // this.type
    // this.contact
    // this.fax
  }

  // async getData () {
  //   let result = await this.knex('store').where({id: this.id})
  //   return result
  // }

  // async getAllData () {
  //   let result = await this.knex('store')
  //   .where('name', 'like', `%${this.name || ''}%`)
  //   .orWhere('type', 'like', `%${this.name || ''}%`)
  //   .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
  //   return result
  // }

  // async count () {
  //   let result = await this.knex('store').count('id as count').where(this.getCondition())
  //   return result
  // }

  // async save () {
  //   let result = await this.knex('store').insert({
  //     name: this.name,
  //     type: this.type,
  //     contact: this.contact,
  //     fax: this.fax,
  //     tel: this.tel,
  //     address: this.address,
  //     created_at: helpers.getCurrentTime('sql')
  //   })
  //   return result
  // }

  // async update () {
  //   let result = await this.knex('store')
  //   .where({id: this.id})
  //   .update({
  //     name: this.name,
  //     type: this.type,
  //     contact: this.contact,
  //     fax: this.fax,
  //     tel: this.tel,
  //     address: this.address,
  //     created_at: helpers.getCurrentTime('sql')
  //   })
  //   return result
  // }

  // async delete () {
  //   let result = await this.knex('store')
  //   .where({id: this.id})
  //   .del()
  //   return result
  // }
  
  // getCondition () {
  //   let conditions = {}
  //   if (this.status) {
  //     conditions.status = this.status
  //   }
    
  //   return conditions
  // }
}