const express = require('express');
const app = express();

const bugsnag = require('@bugsnag/js')
const bugsnagExpress = require('@bugsnag/plugin-express')
const bugsnagClient = bugsnag('4032e4575b129b0de34b79433c1db9a9')
bugsnagClient.use(bugsnagExpress)
const middleware = bugsnagClient.getPlugin('express')
app.use(middleware.requestHandler)
app.use(middleware.errorHandler)

module.exports = bugsnagClient