var express = require('express');
var router = express.Router();
var ObjectId = require('mongojs').ObjectId;

var restRoute = function (db, col) {
  var table = db.collection(col);

  /* GET collection */
  router.get('/' + col + '/', function find(req, res, next) {
    table.find({}, function (err, docs) {
      if(err) {
        return res.send(err);
      }
      res.json(docs);
    });
  });

  /* GET one document */
  router.get('/' + col + '/:id', function findOne(req, res, next) {
    table.findOne({_id: ObjectId(req.params.id)}, function (err, doc) {
      if(err) {
        return res.send(err);
      }
      res.json(doc);
    });
  });

  /* POST create document */
  router.post('/' + col + '/', function save(req, res, next) {
    table.save(req.body , function (err, doc) {
      if(err) {
        return res.send(err);
      }
      res.json(doc);
    });
  });


  /* POST update document */
  router.post('/' + col + '/:id', function findOne(req, res, next) {
    table.findOne({_id: ObjectId(req.params.id)}, function (err, doc) {
      if(err) {
        return res.send(err);
      }

      for(prop in req.body) {
        doc[prop] = req.body[prop];
      }

      table.save(doc, function (err, doc) {
        if(err) {
          return res.send(err);
        }
        res.json(doc);
      });
    });
  });

  /* DELETE a document */
  router.delete('/' + col + '/:id', function del(req, res, next) {
    table.remove({_id: ObjectId(req.params.id)}, function (err, doc) {
      if(err) {
        return res.send(err);
      }
      res.json(doc);
    });
  });
  return router;
}

module.exports = restRoute;
