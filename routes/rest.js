/* jshint node:true */
"use strict";
var express = require('express');
var router = express.Router();
var sendErrorOrResponse = require('../utils/responseUtil').simple;
var requiresLogin = require('../middlewares/login').requiresLogin;

var restRoute = function (db, col) {
  var basicDb = require('../models/basicCollectionModel')(db, col);

  /* GET collection */
  router.get('/' + col + '/', function find(req, res, next) {
    basicDb.find(
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* GET one document */
  router.get('/' + col + '/:id', function findOne(req, res, next) {
    basicDb.findOne(req.params.id,
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* POST create document */
  router.post('/' + col + '/', requiresLogin, function save(req, res, next) {
    basicDb.create(req.body,
       sendErrorOrResponse.bind({res: res})
    );
  });


  /* POST update document */
  router.post('/' + col + '/:id', requiresLogin, function findOne(req, res, next) {
    basicDb.update(req.params.id, req.body,
       sendErrorOrResponse.bind({res: res})
    );
  });

  /* DELETE a document */
  router.delete('/' + col + '/:id', requiresLogin, function del(req, res, next) {
    basicDb.delete(req.params.id,
       sendErrorOrResponse.bind({res: res})
    );
  });

  return router;
};

module.exports = restRoute;
