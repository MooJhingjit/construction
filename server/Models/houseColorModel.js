const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class HouseColor {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.code
    this.created_at
    this.limit = 5
    this.offset = 0
  }
  async getAllData () {
    // let result = await this.knex('house').where(this.getCondition())
    // .where('name', 'like', `%${this.name || ''}%`)
    // .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    // await this.knex.destroy()
    // return result
  }

  async getAllSelection () {
    // let result = await this.knex.select('name').from('house').groupBy('name').orderBy('name', 'desc')
    // // return db.query(`SELECT id, name, plan, garage FROM house ORDER BY id`)
    // await this.knex.destroy()
    // return result
  }
  async getAllPlanSelection () {
    // let result = await this.knex.select('plan').from('house').orderBy('plan', 'desc')
    // // return db.query(`SELECT id, name, plan, garage FROM house ORDER BY id`)
    // await this.knex.destroy()
    // return result
  }

  async getColorSelection () {
    let result = await this.knex.select('code').from('color_menu')
    // return db.query(`SELECT id, name, plan, garage FROM house ORDER BY id`)
    await this.knex.destroy()
    return result
  }

  async count () {
    // let result = await this.knex('house').count('id as count').where(this.getCondition())
    // // await this.knex.destroy()
    // return result
  }

  async save () {
    let result = await this.knex('color_menu').insert({
      code: this.code
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    // let result = await this.knex('house')
    // .where({id: this.id})
    // .update({
    //   plan: this.plan,
    //   name: this.name,
    //   type: this.type,
    //   tile: this.tile,
    //   garage: this.garage,
    //   stair: this.stair,
    //   color: this.color,
    //   created_at: helpers.getCurrentTime('sql')
    // })
    // await this.knex.destroy()
    // return result
  }

  async delete () {
    // let result = await this.knex('house')
    // .where({id: this.id})
    // .del()
    // await this.knex.destroy()
    // return result
  }

  getCondition () {
    let conditions = {}
    if (this.type) {
      conditions.type = this.type
    }
    return conditions
  }
}