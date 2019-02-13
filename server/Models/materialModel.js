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
    .where(this.getCondition())
    await this.knex.destroy()
    return result
  }

  async getDataById () {
    let result = await this.knex.select().from('material').where({
      id: this.id
    })
    // await this.knex.destroy()
    return result
  }

  async getDataQuantity (id) {
    let result = await this.knex('material_quantity')
    .where({'material_id': id})
    // await this.knex.destroy()
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
    // await this.knex.destroy()
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
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    // await this.knex.destroy()
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
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    // await this.knex.destroy()
    return result
  }
  
  async saveQuantity (obj) {
    let result = await this.knex('material_quantity').insert({
      material_id: obj.id,
      side: obj.side,
      color: obj.color,
      price: obj.price,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    // await this.knex.destroy()
    return result
  }

  async updatePrice (obj) {
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('material')
    .where({
      house_id: this.house_id,
      store_id: this.store_id
    })
    .del()
    await this.knex.destroy()
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
    // await this.knex.destroy()
    return result
  }

  async clearMaterialDetail (idArr) {
    let result = await this.knex('material_quantity')
    .whereIn('material_id', idArr)
    .del()
    // await this.knex.destroy()
    return result
  }

  async getAllSelection () {
    let result = await this.knex.select('id', 'name')
    .from('material')
    .where('name', 'like', `%${this.name || ''}%`)
    .where(this.getCondition())
    .orderBy('id', 'desc')
    .limit(20).offset(0)
    await this.knex.destroy()
    return result
  }

  async getMaterialById (idArr) {
    let result = await this.knex('material').whereIn('id', idArr)
    await this.knex.destroy()
    return result
  }

  getCondition () {
    let conditions = {}
    if (this.house_id) {
      conditions.house_id = this.house_id
    }
    if (this.store_id) {
      conditions.store_id = this.store_id
    }
    return conditions
  }
}