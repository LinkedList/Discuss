/*jslint node: true */
var express = require('express');
var mongojs = require('mongojs');

var app = express();

//initialize db
var db = mongojs("nmdiscuss");

//configs
require('./config/passport')(db);
require('./config/appConfig')(app);

// routes
app.use('/', require('./routes/basic')(db));

require('./errorHandlers')(app);

module.exports = app;
