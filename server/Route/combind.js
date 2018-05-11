const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', 
  [
    require('./app'),
    require('./home'),
    require('./login'),
    require('./user'),
    require('./project'),
    require('./contract')
  ]
);

module.exports = app;