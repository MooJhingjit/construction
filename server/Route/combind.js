const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', 
  [
    require('./app'),
    require('./home'),
    require('./user'),
    require('./login'),
    require('./house'),
    require('./project'),
    require('./contract'),
    require('./workOrder'),
    require('./materialGroup')
  ]
);

module.exports = app;