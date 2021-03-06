/*jslint node: true */
"use strict";
var router = require('express').Router();
var passport = require('passport');
var requiresLogin = require('../middlewares/login').requiresLogin;
var ObjectId = require('mongojs').ObjectId;
var properties = require('../config/properties');
var authRoutes = require('./auth');
var sendErrorOrResponse = require('../utils/responseUtil').simple;

var routes = function (db) {
  var usersCol = db.collection('users');
  var seederRoutes = require('./seeder')(db);

  router.use('/', authRoutes);
  router.use('/seeder', seederRoutes);

  router.get('/user', requiresLogin, function (req, res) {
    usersCol.findOne({_id: new ObjectId(req.session.passport.user)},
        sendErrorOrResponse.bind({res: res})
    );
  });

  router.get('/', function (req, res) {
    res.render('index');
  });


  var API_ROUTES = ['index', 'groups', 'users'];

  API_ROUTES.forEach(function(route) {
    router.use('/api', require('./rest')(db, route));
  });

  router.use('/api', require('./threads')(db));
  router.use('/api', require('./posts')(db));

  return router;
};

module.exports = routes;
