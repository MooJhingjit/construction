module.exports.config = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database : 'construction',
    timezone: 'UTC',
  },
  pool: { min: 0, max: 7 }
}