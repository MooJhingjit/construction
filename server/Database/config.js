module.exports.config = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, // change to 1234 on local
    database : 'construction',
    timezone: 'UTC',
  },
  pool: { min: 0, max: 7 }
}