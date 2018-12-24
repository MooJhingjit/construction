module.exports.config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'construction',
    database : 'construction',
    timezone: 'UTC',
  },
  pool: { min: 0, max: 7 }
}