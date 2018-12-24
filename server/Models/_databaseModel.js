const mysql = require('mysql')
module.exports = class Database {
    constructor() {
        this.connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '1234',
          database: 'construction'
        })
    }
    query(sql, args) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err)
                resolve(rows)
            } )
        } )
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end( err => {
                if (err)
                    return reject(err)
                resolve()
            } )
        } )
    }
}