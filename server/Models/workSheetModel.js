const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkSheet {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.plan
    this.work_group_id
    this.work_group_name
    this.project_id
    this.house_id
    this.status
    this.is_extra
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
      plan: this.plan,
      work_group_id: this.work_group_id,
      work_group_name: this.work_group_name,
      project_id: this.project_id,
      house_id: this.house_id,
      is_extra: this.is_extra,
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
    let result = await  this.knex.select('wsd.technician_id', 'ws.house_id', 'ws.plan', 'ws.work_group_name', 'wsd.*', 'technician.name as technician_name')
    .from('work_sheet as ws')
    .leftJoin('work_sheet_detail as wsd', function() {
      this.on('ws.id', '=', 'wsd.work_sheet_id')
    })
    .leftJoin('technician', function() {
      this.on('wsd.technician_id', '=', 'technician.id')
    })
    .where('ws.project_id', this.project_id)
    .where('wsd.status', '!=', '0')
    .where('wsd.status', '!=', '1')
    .where('wsd.status', '!=', '2')
    return result
  }

  async getSummary (technicianId, type) {
    let query = this.knex.select('ws.id as wsId',
    'ws.project_id',
    'ws.is_extra',
    'wsd.total_price',
    'wsd.updated_at',
    'wsd.technician_id',
    'project.name as projectName',
    'technician.name as technicianName')
    .from('work_sheet as ws')
    .leftJoin('work_sheet_detail as wsd', function() {
      this.on('ws.id', '=', 'wsd.work_sheet_id')
    })
    .leftJoin('project as project', function() {
      this.on('ws.project_id', '=', 'project.id')
    })
    .leftJoin('technician as technician', function() {
      this.on('wsd.technician_id', '=', 'technician.id')
    })
    query.where('wsd.status', '5')
    if (this.project_id !== 'null') {
      query.where('ws.project_id', this.project_id)
    }
    if (technicianId !== 'null') {
      query.where('wsd.technician_id', technicianId)
    }
    query.where(function() {
      let con  = this
      if (type !== null) {
        if (type.indexOf('extra') >= 0) con.where('wsd.is_extra', 1)
        if (type.indexOf('normal') >= 0) con.orWhere('wsd.is_extra', 0)
      }
    })
    // console.log(query.toSQL())
    return await query.orderBy('wsd.updated_at', 'desc')
  }

  getCondition () {
    let conditions = {}
    // if (this.technician_id) {
    //   conditions.technician_id = this.technician_id
    // }
    if (this.plan) {
      conditions.plan = this.plan
    }
    if (this.project_id) {
      conditions.project_id = this.project_id
    }
    return conditions
  }
}