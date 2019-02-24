const knex = require('knex')
const db = require('../Database/config')
const conn = knex(db.config);

module.exports =  class project {
  constructor(id){
    this.knex = conn;
    this.id = id;
    this.name
  }

  async getData () {
    let result = await this.knex('project_type').where(this.getCondition())
    return result
  }

  async save () {
    let result = await this.knex('project_type').insert({
      name: this.name
    })
    return result
  }

  // async getAllSelection () {
  //   let result = await this.knex.select('id', 'name').from('project_type').orderBy('created_at', 'desc')
  //   return result
  // }

  getCondition () {
    let conditions = {}
    if (this.id) {
      conditions.id = this.id
    }
    if (this.name) {
      conditions.name = this.name
    }
    return conditions
  }
}