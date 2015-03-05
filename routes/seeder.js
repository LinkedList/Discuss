/*jslint node: true */
"use strict";
var router = require('express').Router();
var requiresLogin = require('../middlewares/login').requiresLogin;
var seeder = require('../models/seeder');
var ObjectId = require('mongojs').ObjectId;
var sendErrorOrResponse = require('../utils/responseUtil').simple;

var seederRoutes = function (db) {
  var usersCol = db.collection('users');
  var postsCol = db.collection('posts');

  router.get('/users/:number', requiresLogin, function (req, res) {
    seeder.users(function(users) {
      usersCol.insert(users, sendErrorOrResponse.bind({res: res}));
    }, req.params.number);
  });

  router.get('/post/:user_id', requiresLogin, function (req, res) {
    usersCol.findOne({_id: new ObjectId(req.params.user_id)}, function (err, user) {
      if(err) {
        return res.send(err);
      }

      seeder.post(function(post){
        postsCol.insert(post, sendErrorOrResponse.bind({res: res}));
      }, user);
    });
  });

  router.get('/randompost', requiresLogin, function (req, res) {
    usersCol.find({}, function (err, users) {
      if(err) {
        return res.send(err);
      }

      seeder.randomPost(function(post){
        postsCol.insert(post, sendErrorOrResponse.bind({res: res}));
      }, users);
    });
  });

  return router;
};

module.exports = seederRoutes;
