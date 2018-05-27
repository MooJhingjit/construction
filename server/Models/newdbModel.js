const knex = require('knex');
const db = require('../Database/config')
class normalKnex{
    constructor(){
        this.knex = knex(db.config);
        this.doSomething()
    }
    async doSomething () {
      let reslut = await this.knex.select().from('project')
      console.log(reslut)
    }
}