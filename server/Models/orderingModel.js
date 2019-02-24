
const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Ordering {
  constructor(id){
    this.knex = knex(db.config)
    this.projectTypeId
    this.id = id
    this.progress_id
    this.store_id
    this.contract_code
    this.total_price
    this.amount
    this.status
    this.order_type
    this.note
    this.date_start
    this.limit = 5
    this.offset = 0
  }

  async getData () {
    let result = await this.knex.select(
      'ordering.*',
      'store.name as storeName',
      'store.type as storeType',
      'store.tel as storeTel',
      'store.fax as storeFax',
      'store.contact as storeContact'
    )
    .from('ordering')
    .leftJoin('store', function() {
      this.on('store.id', '=', 'ordering.store_id')
    })
    .where({'ordering.contract_code': this.contract_code})
    .where('ordering.status', '!=', 'pending')
    await this.knex.destroy()
    return result
  }
  async geDataByType () { // for losing page
    let result = await this.knex('ordering')
    .where({'contract_code': this.contract_code})
    .where({'order_type': this.order_type})
    .where(function() {
      this.where('status', 'confirmed').orWhere('status', 'received')
    })
    await this.knex.destroy()
    return result
  }

  async getIdbyContractCode () {
    let result = await this.knex.select('id')
    .from('ordering')
    .where({'contract_code': this.contract_code})
    // await this.knex.destroy()
    return result
  }

  async getStat () {
    let result = await this.knex.select('*')
    .from('ordering')
    .where({'order_type': this.order_type})
    .where(function() {
      this.where('status', 'confirmed').orWhere('status', 'received')
    })
    // .where('status', 'confirmed').orWhere('status', 'received')
    .orderBy('date_start', 'asc')
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    let result = await this.knex
    .select('contract_code')
    .count('contract_code as amount')
    .from('ordering')
    // .where(this.getCondition())
    .where('contract_code', 'like', `%${this.contract_code || ''}%`)
    .where('status', '!=', 'pending')
    .groupBy('contract_code')
    // .orderBy('contract_code', 'desc').limit(this.limit).offset(this.offset)
    await this.knex.destroy()
    return result
  }
  
  async getOrderRemainingCount () {
    let result = await this.knex
    .select('contract_code', 'order_type', 'amount', 'project_type.name as project_type_name', 'project_type_id')
    .from('ordering')
    .leftJoin('project_type', function() {
      this.on('project_type.id', '=', 'ordering.project_type_id')
    })
    .where('status', 'wait')
    return result
  }

  async getOrderRemainingList () {
    let result = await this.knex
    .select('ordering.*', 'project_type.name as project_type_name')
    .from('ordering')
    .leftJoin('project_type', function() {
      this.on('project_type.id', '=', 'ordering.project_type_id')
    })
    .where('status', 'wait')
    .orderBy('id', 'desc')
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('ordering').count('id as count').where(this.getCondition())
    // await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('ordering').insert({
      project_type_id: this.projectTypeId,
      progress_id: this.progress_id,
      store_id: this.store_id,
      contract_code: this.contract_code,
      total_price: this.total_price,
      amount: this.amount,
      status: this.status,
      order_type: this.order_type,
      note: this.note,
      date_start: this.date_start
    })
    await this.knex.destroy()
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    if (this.order_type) {
      conditions.order_type = this.order_type
    }
    return conditions
  }

  async update () {
    let result = await this.knex('ordering')
    .where({id: this.id})
    .update({
      total_price: this.total_price,
      date_start: this.date_start,
      status: this.status
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('ordering')
    .where({id: this.id})
    .del()
    await this.knex.destroy()
    return result
  }

  async multipleDelete (idArr) {
    let result = await this.knex('ordering')
    .whereIn('id', idArr)
    .del()
    await this.knex.destroy()
    return result
  }

  async checkUpdateOrdering () {
    let result = await this.knex('ordering')
    .update({
      date_start: this.date_start,
      status: this.status
    })
    .where('date_start', '<=', this.date_start)
    .where('status', 'pending')
    await this.knex.destroy()
    return result
  }

  async getDataByContractCode () {
    let result = await this.knex('ordering')
    .where({contract_code: this.contract_code})
    await this.knex.destroy()
    return result
  }

  async deleteByContractCode () {
    let result = await this.knex('ordering')
    .where({contract_code: this.contract_code})
    .del()
    await this.knex.destroy()
    return result
  }
}