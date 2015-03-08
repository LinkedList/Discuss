/* jshint node:true */
"use strict";
var express = require('express');
var router = express.Router();
var sendErrorOrResponse = require('../utils/responseUtil').simple;

var postsRoutes = function (db) {
  var postsM = require('../models/posts')(db);
  var col = 'posts';

  /* GET collection */
  router.get('/' + col + '/', function find(req, res, next) {
    postsM.find(
       sendErrorOrResponse.bind({res: res})
    );
  });

  router.get('/' + col + '/sortTime' , function(req, res, next) {
    postsM.findSort(
      {timestamp:1},
      sendErrorOrResponse.bind({res: res})
    );
  });

  /* GET one document */
  router.get('/' + col + '/:id', function findOne(req, res, next) {
    postsM.findOne(req.params.id,
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* POST create document */
  router.post('/' + col + '/', function save(req, res, next) {
    postsM.create(req.body,
       sendErrorOrResponse.bind({res: res})
    );
  });


  /* POST update document */
  router.post('/' + col + '/:id', function findOne(req, res, next) {
    postsM.update(req.params.id, req.body,
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* DELETE a document */
  router.delete('/' + col + '/:id', function del(req, res, next) {
    postsM.delete(req.params.id,
       sendErrorOrResponse.bind({res: res})
    );
  });


  return router;
};

module.exports = postsRoutes;
