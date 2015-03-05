/*jslint node: true */
"use strict";
var router = require('express').Router();
var passport = require('passport');
var requiresLogin = require('../middlewares/login').requiresLogin;
var seeder = require('../models/seeder');
var ObjectId = require('mongojs').ObjectId;
var properties = require('../config/properties');
var authRoutes = require('./auth');
var sendErrorOrResponse = require('../utils/responseUtil').simple;

var routes = function (db) {
  var usersCol = db.collection('users');
  var postsCol = db.collection('posts');

  router.use('/', authRoutes);

  router.get('/user', requiresLogin, function (req, res) {
    usersCol.findOne({_id: new ObjectId(req.session.passport.user)},
        sendErrorOrResponse.bind({res: res})
    );
  });

  router.get('/', requiresLogin, function (req, res) {
    res.render('index');
  });

  router.get('/seeder/users/:number', requiresLogin, function (req, res) {
    seeder.users(function(users) {
      usersCol.insert(users, sendErrorOrResponse.bind({res: res}));
    }, req.params.number);
  });

  router.get('/seeder/post/:user_id', requiresLogin, function (req, res) {
    usersCol.findOne({_id: new ObjectId(req.params.user_id)}, function (err, user) {
      if(err) {
        return res.send(err);
      }

      seeder.post(function(post){
        postsCol.insert(post, sendErrorOrResponse.bind({res: res}));
      }, user);
    });
  });

  router.get('/seeder/randompost', requiresLogin, function (req, res) {
    usersCol.find({}, function (err, users) {
      if(err) {
        return res.send(err);
      }

      seeder.randomPost(function(post){
        postsCol.insert(post, sendErrorOrResponse.bind({res: res}));
      }, users);
    });
  });

  var API_ROUTES = ['index', 'threads', 'posts', 'groups', 'users'];

  API_ROUTES.forEach(function(route) {
    router.use('/api', requiresLogin, require('./rest')(db, route));
  });

  return router;
};

module.exports = routes;
