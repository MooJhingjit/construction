const knex = require('knex');
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class Material {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id;
    this.house_id
    this.store_id
    this.name
    this.delay
    this.unit
    this.amount
    this.price
  }
  async getData () {
    let result = await this.knex('material')
    // .join('material_price', 'material.id', '=', 'material_price.material_id').select()
    return result
  }

  async getDataById () {
    let result = await this.knex.select().from('material').where({
      id: this.id
    })
    return result
  }

  async getDataPrice (id) {
    let result = await this.knex('material_price')
    .where({'material_id': id})
    return result
  }

  async getDataByAttr () {
    let conditions = {
      store_id: this.store_id
    }
    if (this.house_id) {
      conditions.house_id = this.house_id
    }
    let result = await this.knex.select().from('material').where(conditions)
    return result
  }

  async save () {
    let result = await this.knex('material').insert({
      name: this.name,
      delay: this.delay,
      unit: this.unit,
      house_id: this.house_id,
      store_id: this.store_id,
      amount: this.amount,
      price: this.price,
      created_at: helpers.getCurrentTime('sql')
    })
    return result
  }

  async updateMaterial () {
    let result = await this.knex('material')
    .where({id: this.id})
    .update({
      name: this.name,
      delay: this.delay,
      unit: this.unit,
      house_id: this.house_id,
      store_id: this.store_id,
      amount: this.amount,
      price: this.price,
      created_at: helpers.getCurrentTime('sql')
    })
    return result
  }
  
  async savePrice (obj) {
    let result = await this.knex('material_price').insert({
      material_id: obj.id,
      side: obj.side,
      color: obj.color,
      price: obj.price,
      created_at: helpers.getCurrentTime('sql')
    })
    return result
  }

  async updatePrice (obj) {
    return result
  }

  async delete () {
    let result = await this.knex('material')
    .where({
      house_id: this.house_id,
      store_id: this.store_id
    })
    .del()
    return result
  }

  async clearMaterial (idArr) {
    let conditions = {
      store_id: this.store_id
    }
    if (this.house_id) {
      conditions.house_id = this.house_id
    }
    let result = await this.knex('material')
    .where(conditions)
    .whereNotIn('id', idArr)
    .del()
    return result
  }

  async clearMaterialDetail (idArr) {
    let result = await this.knex('material_price')
    .whereIn('material_id', idArr)
    .del()
    return result
  }

  async getAllSelection () {
    let result = await this.knex.select('id', 'name')
    .from('material')
    .where('name', 'like', `%${this.name || ''}%`)
    .orderBy('id', 'desc')
    .limit(20).offset(0)
    return result
  }

  async getMaterialById (idArr) {
    let result = await this.knex('material').whereIn('id', idArr)
    return result
  }
}