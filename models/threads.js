/* jshint node: true */
"use strict";

var ObjectId = require('mongojs').ObjectId;

var threadsM = function (db) {
  var tCol = db.collection('threads');
  var basicDb = require('../models/basicCollectionModel')(db, 'threads');

  return {
    find: basicDb.find,
    findOne: basicDb.findOne,
    create: basicDb.create,
    update: basicDb.update,
    delete: basicDb.delete
  };
};

module.exports = threadsM;
