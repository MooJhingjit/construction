const connection = require('../Database/connect')

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected...')
// })

module.exports.test = () => {
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
    connection.query('CREATE TABLE people(id int primary key, name varchar(255), age int, address text)', function(err, result) {
      if (err) throw err
      connection.query('INSERT INTO people (id, name, age, address) VALUES (?, ?, ?, ?)', [1, 'Larry', '41', 'California, USA'], function(err, result) {
        if (err) throw err
        connection.query('SELECT * FROM people', function(err, results) {
          if (err) throw err
          console.log(results[0].id)
          console.log(results[0].name)
          console.log(results[0].age)
          console.log(results[0].address)
        })
      })
    }) 
  })
}