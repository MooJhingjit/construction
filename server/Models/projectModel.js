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
    return result
  }

  async getAllData () {
    let result = await this.knex('project').where(this.getCondition())
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    return result
  }

  async count () {
    let result = await this.knex('project').count('id as count').where(this.getCondition())
    return result
  }

  async save () {
    let result = await this.knex('project').insert({
      code: this.code,
      name: this.name,
      address: this.address,
      type: this.type,
      created_at: helpers.getCurrentTime('sql')
    })
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
      created_at: helpers.getCurrentTime('sql')
    })
    return result
  }

  async delete () {
    let result = await this.knex('project')
    .where({id: this.id})
    .del()
    return result
  }

  async getStat () {
    // let result = await this.knex.select(knex.raw('count(*) as count'), knex.raw('DATE_FORMAT(created_at,"%Y-%m-%d") as created_day'))
    // .from('project')
    // .whereRaw(`YEAR(created_at) = ${helpers.getCurrentTime('year')}`)
    // .groupByRaw('MONTH(created_at)')
    return null
  }

  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    return conditions
  }
}