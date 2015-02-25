/*jslint node: true */
"use strict";
var router = require('express').Router();
var passport = require('passport');
var requiresLogin = require('../middlewares/login').requiresLogin;
var seeder = require('../models/seeder');

var routes = function (db) {
  router.get('/auth/google', passport.authenticate('google'));
  router.get('/auth/google/return', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  router.get('/login', function (req, res) {
    res.render('login');
  });

  router.get('/user', requiresLogin, function (req, res) {
    res.json(req.session.passport.user);
  });

  router.get('/', requiresLogin, function (req, res) {
    res.render('index');
  });

  router.get('/seeder/users/:number', requiresLogin, function (req, res) {
    seeder.users(function(users) {
      var usersTable = db.collection('users');
      usersTable.insert(users, function (err, docs) {
        if(err) {
          return res.send(err);
        }

        res.json(users);
      });

    }, req.params.number);
  });

  var API_ROUTES = ['index', 'threads', 'posts', 'groups'];

  API_ROUTES.forEach(function(route) {
    router.use('/api', requiresLogin, require('./rest')(db, route));
  });

  return router;
};

module.exports = routes;
