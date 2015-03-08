/* jshint node: true */
"use strict";

var ObjectId = require('mongojs').ObjectId;

var postsM = function (db) {
  var pCol = db.collection('posts');
  var basicDb = require('../models/basicCollectionModel')(db, 'posts');

  return {
    find: basicDb.find,
    findOne: basicDb.findOne,
    create: basicDb.create,
    update: basicDb.update,
    delete: basicDb.delete
  };
};

module.exports = postsM;
