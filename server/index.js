require('dotenv').config()
// const helpers = require('./Libraries/helpers')
const express = require('express');
const app = express();
const CronJob = require('cron').CronJob;
const jwt = require('jsonwebtoken');
const ordering = require('./Controllers/orderingController.js')
const socket = require('./Libraries/socket.js');
require('./Libraries/tracking.js');

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
  if (req.url === '/api/login' || req.url === '/api/app/resource') {
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

new CronJob('0 30 4 * * *', async function() { // do it everyday at 
  await ordering.checkOrdering();
}, null, true, 'Asia/Bangkok');


//listen for requests
const port = process.env.PORT || 3000
let server = app.listen(port, function(){
    console.log(`now listenting on port ${port}...`);
    // console.log(helpers.getCurrentDate('YYYY-MM-DD HH:mm:ss'))
})

socket.socketStartUp(server);