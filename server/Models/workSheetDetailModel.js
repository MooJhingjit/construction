const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkSheetDetail {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.work_sheet_id
    this.technician_id
    this.time
    this.name
    this.amount
    this.unit
    this.price
    this.total_price
    this.note
    this.status
    this.is_extra
    this.has_rejected
    this.updated_at
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    // let result = await this.knex('work_sheet_detail').where(this.getCondition())
    let result = await  this.knex.select('wsd.*', 'technician.name as technicianName')
    .from('work_sheet_detail as wsd')
    .leftJoin('technician', function() {
      this.on('wsd.technician_id', '=', 'technician.id')
    })
    .where('wsd.work_sheet_id',  this.work_sheet_id)
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    // let result = await this.knex('work_group')
    // .where('name', 'like', `%${this.name || ''}%`)
    // .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    // await this.knex.destroy()
    // return result
  }

  async count () {
    // let result = await this.knex('work_group').count('id as count').where(this.getCondition())
    // return result
  }

  async save () {
    let result = await this.knex('work_sheet_detail').insert({
      work_sheet_id: this.work_sheet_id,
      technician_id: this.technician_id,
      time: this.time,
      name: this.name,
      amount: this.amount,
      unit: this.unit,
      price: this.price,
      total_price: this.total_price,
      note: this.note,
      status: this.status.toString(),
      is_extra: this.is_extra
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('work_sheet_detail')
    .where({id: this.id})
    .update(this.getCondition())
    await this.knex.destroy()
    return result
  }

  async delete () {
    // let result = await this.knex('work_group')
    // .where({id: this.id})
    // .del()
    // await this.knex.destroy()
    // return result
  }

  async getStat (type) {
    let result = null
    if (type === 'approved') {
      result = await this.knex.select('updated_at as date').from('work_sheet_detail')
      .where({status: '5'}).orderBy('date', 'asc')
    } else {
      result = await this.knex.select('created_at as date', 'total_price').from('work_sheet_detail')
      .where(this.getCondition()).orderBy('date', 'asc')
    }
    await this.knex.destroy()
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.amount) {
      conditions.amount = this.amount
    }
    if (this.technician_id || this.technician_id === null) {
      conditions.technician_id = this.technician_id
    }
    if (this.status) {
      conditions.status = this.status
    }
    if (this.has_rejected === 0 || this.has_rejected === 1) {
      conditions.has_rejected = this.has_rejected
    }
    if (this.price) {
      conditions.price = this.price
    }
    if (this.total_price) {
      conditions.total_price = this.total_price
    }
    if (this.updated_at) {
      conditions.updated_at = this.updated_at
    }
    if (this.is_extra) {
      conditions.is_extra = this.is_extra
    }
    return conditions
  }
}