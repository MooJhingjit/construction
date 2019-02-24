
const knex = require('knex')
const db = require('../Database/config')
const helpers = require('../Libraries/helpers')

module.exports =  class WorkOrderDetail {
  constructor(id){
    this.knex = knex(db.config);
    this.id = id
    this.work_order_id
    // this.work_order_time
    this.order
    this.name
    this.post_order
  }

  // async getData () {
  //   let result = await this.knex.select('time', 'pre_order', 'work_order.created_at as work_order_date', 'work_order_detail.name as name', 'post_order',
  //   'work_order_detail.created_at as work_order_detail_date',
  //   'material_group.name as material_group_name', 'material_group.id as material_group_id'
  //   )
  //   .from('work_order_detail')
  //   .leftJoin('work_order_detail', 'work_order.time', 'work_order_detail.work_order_time')
  //   .leftJoin('material_group', 'material_group .id', 'work_order_detail.post_order')
  //   .where({'work_order.time': this.time})
  //   .orderBy('work_order_detail.id', 'asc')
  // await this.knex.destroy()
  // return result
  // }

  async getData () { // with matert
    let result = await this.knex
    .select(
    'work_order_detail.id as id',
    'work_order_detail.name as name', 'post_order',
    // 'work_order_detail.work_order_time',
    'work_order_detail.work_order_id',
    'work_order_detail.order',
    'work_order_detail.created_at as work_order_detail_date',
    'material_group.name as material_group_name', 'material_group.id as material_group_id'
    )
    .from('work_order_detail')
    .leftJoin('material_group', 'material_group.id', 'work_order_detail.post_order')
    .where({'work_order_detail.work_order_id': this.work_order_id})
    .orderBy('work_order_detail.order', 'asc')
    await this.knex.destroy()
    return result
  }

  async getTemplateData (projectTypeId) {
    let result = await this.knex
    .select('work_order_detail.*', 'work_order.project_type_id as project_type_id', 'work_order.time as time')
    .from('work_order_detail')
    .leftJoin('work_order', 'work_order.id', 'work_order_detail.work_order_id')
    .where({'work_order.project_type_id': projectTypeId})
    .orderBy('work_order.time', 'asc') // don't change order by !!!! important
    .orderBy('work_order_detail.order', 'asc') // don't change order by !!!! important
    await this.knex.destroy()
    return result
  }


  async getPostOrder (projectTypeId, time) {
    // let result = await this.knex('work_order_detail')
    // .where({order: this.order})
    // .where({work_order_time: this.work_order_time})
    // await this.knex.destroy()
    // return result

    let result = await this.knex
    .select('work_order_detail.*')
    .from('work_order_detail')
    .leftJoin('work_order', 'work_order.id', 'work_order_detail.work_order_id')
    .where({'work_order.project_type_id': projectTypeId})
    .where({'work_order.time': time})
    .where({'work_order_detail.order': this.order})
    await this.knex.destroy()
    return result
  }

  async count () {
    let result = await this.knex('work_order_detail').count('id as count')
    // await this.knex.destroy()
    return result
  }

  async save () {
    let result = await this.knex('work_order_detail').insert({
      // work_order_time: this.work_order_time,
      order: this.order,
      work_order_id: this.work_order_id,
      name: this.name,
      post_order: this.post_order,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async update () {
    let result = await this.knex('work_order_detail')
    .where({id: this.id})
    .update({
      // work_order_time: this.work_order_time,
      order: this.order,
      name: this.name,
      post_order: this.post_order,
      created_at: helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss')
    })
    await this.knex.destroy()
    return result
  }

  async delete () {
    let result = await this.knex('work_order_detail')
    .where({work_order_id: this.work_order_id})
    .del()
    await this.knex.destroy()
    return result
  }
}