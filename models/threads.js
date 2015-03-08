/* jshint node: true */
"use strict";

var ObjectId = require('mongojs').ObjectId;

var threadsM = function (db) {
  var postsM = require('./posts')(db);
  var tCol = db.collection('threads');
  var basicDb = require('../models/basicCollectionModel')(db, 'threads');

  var create = function (tCreateObj, call) {
    var thread = {
      name: tCreateObj.name,
      user_id: new ObjectId(tCreateObj.user_id),
      timestamp: tCreateObj.timestamp,
    };

    tCol.save(thread, function (err, t) {
      if(err) {
        call(err);
      }

      var post = {
        text: tCreateObj.post,
        user_id: new ObjectId(tCreateObj.user_id),
        thread_id: t._id,
        timestamp: tCreateObj.timestamp
      };

      postsM.create(post, function (err, doc) {
        call(err, t);
      });
    });
  };

  var findOne = function (_id, call) {
    basicDb.findOne(_id, function (err, thread) {
      if(err) {
        call(err);
      }

      postsM.findWhere({thread_id: new ObjectId(_id)}, function (err, posts) {
        if(err) {
          call(err);
        }

        thread.posts = posts;
        call(null, thread);
      });
    });
  };

  return {
    find: basicDb.find,
    findOne: findOne,
    create: create,
    update: basicDb.update,
    delete: basicDb.delete
  };
};

module.exports = threadsM;
