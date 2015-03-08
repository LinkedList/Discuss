/* jshint node: true */
"use strict";

var ObjectId = require('mongojs').ObjectId;

var postsM = function (db) {
  var pCol = db.collection('posts');
  var basicDb = require('../models/basicCollectionModel')(db, 'posts');

  var findSort = function (sort, call) {
    pCol.find().sort(sort, function (err, docs) {
      call(err, docs);
    });
  };

  var findWhere = function (where, call) {
    pCol.find(where, function (err, docs) {
      call(err, docs);
    });
  };

  return {
    find: basicDb.find,
    findSort: findSort,
    findWhere: findWhere,
    findOne: basicDb.findOne,
    create: basicDb.create,
    update: basicDb.update,
    delete: basicDb.delete
  };
};

module.exports = postsM;
