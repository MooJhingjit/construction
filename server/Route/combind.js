const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', 
  [
    require('./home'),
    require('./login'),
    require('./user')
  ]
);

module.exports = app;