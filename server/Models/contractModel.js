const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Contract {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.code
    this.project_id
    this.contract_type
    this.plan
    this.house_id
    this.price
    this.date_start
    this.paid
    this.status
    this.assign
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex.select('contract.*', 'contract.plan as contractPlan', 'house.*')
    .from('contract')
    .leftJoin('house', function() {
      this.on('contract.house_id', '=', 'house.name')
      .andOn('contract.plan', '=', 'house.plan')
    })
    .where({'contract.code': this.code})
    await this.knex.destroy()
    return result
  }
  async getAllData () {
    let result = await this.knex('contract')
    .where(this.getCondition())
    await this.knex.destroy()
    return result
  }
  
  async checkPermission () {
    let result = await this.knex.select('id')
    .from('contract')
    .where({'code': this.code, assign: this.assign})
    await this.knex.destroy()
    return result
  }

  async getAllSelection (type) {
    let result = null
    if (type === 'normal') {
      result = await this.knex.select('code').from('contract')
      .orderBy('created_at', 'desc')
    } else {
      result = await this.knex.select('contract.*', 'project.name as project_name')
      .from('contract')
      .join('project', 'project.id', '=', 'contract.project_id')
      .where({'contract.status': 'ip'}).orWhere({'contract.status': 'wait'})
      // .where(function() {
      //   this.where({'contract.status': 'ip'}).orWhere({'contract.status': 'wait'})
      // }).where({'contract.assign': this.assign})
      .orderBy('contract.created_at', 'desc')
    }
    
    // return db.query(`SELECT id, name, plan, garage FROM house ORDER BY id`)
    await this.knex.destroy()
    return result
  }

  async getContractDetail () {
    let result = await this.knex('contract')
    .where({'contract.code': this.code})
    await this.knex.destroy()
    return result
  }

  async getSelectedData () {
    let result = await this.knex('contract')
    .where(this.getCondition())
    .where('code', 'like', `%${this.code || ''}%`)
    .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    await this.knex.destroy()
    return result
  }

  async getStat () {
    let result = await this.knex.select('created_at').from('contract')
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('contract').count('id as count').where(this.getCondition())
    // await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('contract').insert({
      code: this.code,
      project_id: this.project_id,
      contract_type: this.contract_type,
      plan: this.plan,
      house_id: this.house_id,
      price: this.price,
      // quarter: this.quarter,
      date_start: this.date_start,
      paid: this.paid,
      status: this.status,
      created_at: helpers.getCurrentTime('sql')
    })
    await this.knex.destroy()
    return result
  }

  async updateStatus () {
    let result = await this.knex('contract')
    .where({code: this.code})
    .update({
      status: this.status,
      assign: this.assign
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('contract')
    .where({id: this.id})
    .del()
    await this.knex.destroy()
    return result
  }

  async getPreiod () {
    let result = await this.knex('contract_preiod')
    .where({house_id: this.house_id})
    await this.knex.destroy()
    return result
  }

  async checkDuplicate () {
    let result = await this.knex.select('id')
    .from('contract')
    .where(this.getCondition())
    
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
    if (this.project_id) {
      conditions.project_id = this.project_id
    }
    if (this.assign) {
      conditions.assign = this.assign
    }
    return conditions
  }
}