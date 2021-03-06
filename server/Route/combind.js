const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/api', 
  [
    require('./app'),
    require('./home'),
    require('./store'),
    require('./user'),
    require('./login'),
    require('./house'),
    require('./losing'),
    require('./project'),
    require('./material'),
    require('./ordering'),
    require('./contract'),
    require('./frontSite'),
    require('./workGroup'),
    require('./workSheet'),
    require('./workOrder'),
    require('./technician'),
    require('./payingPeriod'),
    require('./materialGroup'),
    require('./workGroupDetail'),
    require('./workSheetDetail')
  ]
);

module.exports = app;