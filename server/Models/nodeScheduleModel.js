const knex = require('knex')
const db = require('../Database/config')

module.exports =  class NodeSchedule {
  constructor(){
    this.knex = knex(db.config);
  }

  async save () {
    let result = await this.knex('node_schedule').insert({})
    console.log('dd')
    await this.knex.destroy()
    return result
  }
}