const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkSheet {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.technician_id
    this.plan
    this.work_group_id
    this.work_group_name
    this.project_id
    this.house_id
    this.status
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex('work_sheet').where(this.getCondition())
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    // let result = await this.knex('work_sheet')
    // .where('name', 'like', `%${this.name || ''}%`)
    // .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    // await this.knex.destroy()
    // return result
  }

  async count () {
    // let result = await this.knex('work_sheet').count('id as count').where(this.getCondition())
    // return result
  }

  async save () {
    let result = await this.knex('work_sheet').insert({
      technician_id: this.technician_id,
      plan: this.plan,
      work_group_id: this.work_group_id,
      work_group_name: this.work_group_name,
      project_id: this.project_id,
      house_id: this.house_id,
      status: 'IP'
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    // let result = await this.knex('work_sheet')
    // .where({id: this.id})
    // .update({
    //   name: this.name
    // })
    // await this.knex.destroy()
    // return result
  }

  async delete () {
    // let result = await this.knex('work_sheet')
    // .where({id: this.id})
    // .del()
    // await this.knex.destroy()
    // return result
  }

  async getApprovalData () {
    let result = await  this.knex.select('ws.technician_id', 'ws.plan', 'ws.work_group_name', 'wsd.*', 'technician.name as technician_name')
    .from('work_sheet as ws')
    .leftJoin('work_sheet_detail as wsd', function() {
      this.on('ws.id', '=', 'wsd.work_sheet_id')
    })
    .leftJoin('technician', function() {
      this.on('ws.technician_id', '=', 'technician.id')
    })
    .where('ws.project_id', this.project_id)
    .where('wsd.status', '!=', '0')
    
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.technician_id) {
      conditions.technician_id = this.technician_id
    }
    if (this.plan) {
      conditions.plan = this.plan
    }
    if (this.project_id) {
      conditions.project_id = this.project_id
    }
    return conditions
  }
}