const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class User {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.name
    this.username
    this.password
    this.email
    this.phone
    this.address
    this.position
    this.limit = 5
    this.offset = 0
  }

  async getUser () {
    let result = await this.knex('user').where({id: this.id})
    return result
  }

  async getUserDropdown () {
    let result = await this.knex.select('id as key', 'name as name')
    .from('user')
    .where({position: this.position})
    return result
  }

  async getUserByUsername () {
    let result = await this.knex.select('id', 'username', 'password')
    .from('user')
    .where({username: this.username})
    .limit(1)
    return result
    // return db.query(`SELECT username, pa FROM user WHERE username = ${this.username}`)
  }

  async getAllData () {

    let result = await this.knex('user')
    .where(this.getCondition())
    .orderBy('id', 'desc')
    .limit(this.limit).offset(this.offset)
    return result
    // return db.query(`SELECT * FROM user ${condition} ORDER BY id LIMIT ${this.limit} OFFSET ${this.offset} `)
  }

  async count () {
    let result = await this.knex('user')
    .count('id as count')
    .where(this.getCondition())
    
    return result
  }

  async save () {
    let result = await this.knex('user').insert({
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
      phone: this.phone,
      address: this.address,
      position: this.position
    })
    return result
  }

  async update () {
    let result = await this.knex('user')
    .where({id: this.id})
    .update({
      name: this.name,
      username: this.username,
      email: this.email,
      phone: this.phone,
      address: this.address,
      position: this.position
    })
    return result
  }

  async delete () {
    let result = await this.knex('user')
    .where({id: this.id})
    .del()
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.name) {
      conditions.name = this.name
    }
    
    return conditions
  }

}