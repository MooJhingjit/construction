const express = require('express');
const app = express();
// const helpers = require('./Libraries/helpers')
const schedule = require('node-schedule');
const jwt = require('jsonwebtoken');
const ordering = require('./Controllers/orderingController.js')
const socket = require('./Libraries/socket.js');

app.use('/static', express.static('public'))
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
  if (req.url === '/api/login') {
    next();
    return;
  } else {
    if(bearerHeader !== undefined) {
      const bearer = bearerHeader.split(' ');
      const token = bearer[1];
      jwt.verify(token, 'secretkey', (err, authData) => {
        if (err) {
          res.status(401).send('Forbiddens')
        } else {
          req.token = token;
          next();
        }
      })
    } else {
      res.status(403).send('Forbiddens')
    }
  }
  
}

let rule = new schedule.RecurrenceRule();
rule.hour = 04;
rule.minute = 30;
schedule.scheduleJob(rule, async function(){
  // run task
  await ordering.checkOrdering();
});

//listen for requests
const port = process.env.PORT || 3000
let server = app.listen(port, function(){
    console.log(`now listenting on port ${port}...`);
})

socket.socketStartUp(server);