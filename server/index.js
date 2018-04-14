const express = require('express');
const app = express();
const helpers = require('./Libraries/helpers')
const jwt = require('jsonwebtoken');

app.all('*', verifyToken, function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'cache-control', 'x-requested-with', 'Authorization']);
  next();
});

app.use(require('./Route/combind'));

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (req.method === 'OPTIONS') {
    next();
    return;
  }
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (req.url === '/api/login') {
      next();
      return;
    }
    jwt.verify(token, 'secretkey', (err, authData) => {
      if (err) {
        res.status(401).send('Forbidden')
      } else {
        req.token = token;
        next();
      }
    })
  } else {
    res.status(403).send('Forbidden')
  }
}

//listen for requests
const port = process.env.PORT || 3000
app.listen(port, function(){
    console.log(`now listenting on port ${port}...`);
})