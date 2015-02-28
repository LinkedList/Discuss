/*jslint node: true */
"use strict";
var router = require('express').Router();
var passport = require('passport');
var requiresLogin = require('../middlewares/login').requiresLogin;
var seeder = require('../models/seeder');
var ObjectId = require('mongojs').ObjectId;
var properties = require('../config/properties');

var routes = function (db) {
  router.get('/auth/google', passport.authenticate('google'));
  router.get('/auth/google/return', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  router.get('/login', function (req, res) {
    console.log(process.env.APP_NAME);
    res.render('login', {name : properties.appName});
  });

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/user', requiresLogin, function (req, res) {
    res.json(req.session.passport.user);
  });

  router.get('/', requiresLogin, function (req, res) {
    res.render('index');
  });

  router.get('/seeder/users/:number', requiresLogin, function (req, res) {
    seeder.users(function(users) {
      var usersCol = db.collection('users');
      usersCol.insert(users, function (err, docs) {
        if(err) {
          return res.send(err);
        }

        res.json(users);
      });

    }, req.params.number);
  });

  router.get('/seeder/post/:user_id', requiresLogin, function (req, res) {
    var usersCol = db.collection('users');
    usersCol.findOne({_id: ObjectId(req.params.user_id)}, function (err, user) {
      if(err) {
        return res.send(err);
      }

      seeder.post(function(post){
        var postsCol = db.collection('posts');
        postsCol.insert(post, function (err, doc) {
          if(err) {
            return res.send(err);
          }

          res.json(doc);
        });
      }, user);
    });
  });

  router.get('/seeder/randompost', requiresLogin, function (req, res) {
    var usersCol = db.collection('users');
    usersCol.find({}, function (err, users) {
      if(err) {
        return res.send(err);
      }

      seeder.randomPost(function(post){
        var postsCol = db.collection('posts');
        postsCol.insert(post, function (err, doc) {
          if(err) {
            return res.send(err);
          }

          res.json(doc);
        });
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
