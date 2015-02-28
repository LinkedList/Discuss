"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var properties = require('./properties');

var appConfig = function (app) {
    // view engine setup
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
    app.locals.appName = properties.appName;

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(session({
        secret: "it's a god damn secret",
        store: new MongoStore({url: 'mongodb://localhost/nmdiscuss'}),
        resave: false,
        saveUninitialized: true
    }));

    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(passport.initialize());
    app.use(passport.session());

};

module.exports = appConfig;
