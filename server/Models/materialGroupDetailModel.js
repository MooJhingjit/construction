const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class MaterialGroupDetail {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id
    this.house_id
    this.material_group_id
    this.material_id
    this.amount
  }

  async getData () {
    let result = await this.knex.select('material_group_detail.*', 'material.name as name', 'material.store_id', 'store.name as store_name').from('material_group_detail')
    .leftJoin('material', 'material.id', 'material_group_detail.material_id')
    .leftJoin('store', 'material.store_id', 'store.id')
    .where({
      material_group_id: this.material_group_id
    })
    await this.knex.destroy()
    return result
  }

  async getGroupByMaterial () {
    let result = await this.knex.select('material_group.id', 'material_group.name').from('material_group_detail')
    .leftJoin('material_group', 'material_group.id', 'material_group_detail.material_group_id')
    .where({
      material_id: this.material_id
    })
    await this.knex.destroy()
    return result
  }

  async getAllSelection () {
    let result = await this.knex.select('id', 'name')
    .from('material_group')
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc')
    .limit(20).offset(0)
    await this.knex.destroy()
    return result
  }

  async getAllData () {
    let result = await this.knex('material_group_detail')
    .where(this.getCondition())
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc').limit(this.limit).offset(this.offset)
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('material_group_detail').count('id as count').where(this.getCondition())
    // await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('material_group_detail').insert({
      house_id: this.house_id,
      material_group_id: this.material_group_id,
      material_id: this.material_id,
      amount: this.amount,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('material_group_detail')
    .where({id: this.id})
    .update({
      house_id: this.house_id,
      material_group_id: this.material_group_id,
      material_id: this.material_id,
      amount: this.amount,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('material_group_detail')
    .where(this.getCondition())
    .del()
    await this.knex.destroy()
    return result
  }

  async clearMaterialGroup (idArr) {
    let result = await this.knex('material_group_detail')
    .whereIn('material_id', idArr)
    .del()
    await this.knex.destroy()
    return result
  }

  async getMaterialByGroup () {
    let result = await this.knex('material_group_detail')
    .where({
      material_group_id: this.material_group_id,
      house_id: this.house_id
    })
    await this.knex.destroy()
    return result
  }
  

  getCondition () {
    let conditions = {}
    if (this.status) {
      conditions.status = this.status
    }
    if (this.material_group_id) {
      conditions.material_group_id = this.material_group_id
    }
    if (this.house_id) {
      conditions.house_id = this.house_id
    }
    return conditions
  }
}