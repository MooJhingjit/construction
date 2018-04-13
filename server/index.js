const express = require('express'); //es5
const jwt = require('jsonwebtoken');
// const path = require('path');
const app = express();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'cache-control', 'x-requested-with']);
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
})

app.get('/api/access', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(403).send('Forbidden')
    } else {
      res.json({
        message: 'Post created...',
        authData
      })
    }
  })
})

app.post('/api/login', (req, res) => {
  const user = {
    id: 2,
    username: 'Moo2',
    email: 'moo@gmail.com2'
  };

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({token})
  })
})

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(403).send('Forbidden')
  }
}

// app.get('/params/:id/:name', (req, res) => {
//   return res.status(404).send(req.params);
//   console.log('test')
  // res.send(req.query);
// })
// require('./routes/smart-resume/combind')
// app.use(require('./routes/smart-resume/combind'));

//error handling middleware
// app.use(function(err, req, res, next){
//     res.status(422).send({error: err.message});
// })

//listen for requests
const port = process.env.PORT || 3000
app.listen(port, function(){
    console.log(`now listenting on port ${port}...`);
})