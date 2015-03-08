/* jshint node:true */
"use strict";
var express = require('express');
var router = express.Router();
var sendErrorOrResponse = require('../utils/responseUtil').simple;

var threadsRoutes = function (db) {
  var threadsM = require('../models/threads')(db);
  var col = 'threads';

  /* GET collection */
  router.get('/' + col + '/', function find(req, res, next) {
    threadsM.find(
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* GET one document */
  router.get('/' + col + '/:id', function findOne(req, res, next) {
    threadsM.findOne(req.params.id,
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* POST create document */
  router.post('/' + col + '/', function save(req, res, next) {
    threadsM.create(req.body,
       sendErrorOrResponse.bind({res: res})
    );
  });


  /* POST update document */
  router.post('/' + col + '/:id', function findOne(req, res, next) {
    threadsM.update(req.params.id, req.body,
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* DELETE a document */
  router.delete('/' + col + '/:id', function del(req, res, next) {
    threadsM.delete(req.params.id,
       sendErrorOrResponse.bind({res: res})
    );
  });

  return router;
};

module.exports = threadsRoutes;
