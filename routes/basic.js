var router = require('express').Router();
var passport = require('passport');
var requiresLogin = require('../middlewares/login').requiresLogin;

var routes = function (db) {
  router.get('/auth/google', passport.authenticate('google'));
  router.get('/auth/google/return', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  router.get('/login', function (req, res) {
    res.render('login');
  });

  router.get('/user', requiresLogin, function (req, res) {
    res.json(req.session.passport.user);
  });

  router.get('/', requiresLogin, function (req, res) {
    res.render('index');
  });

  router.use('/api', requiresLogin, require('./rest')(db, 'index'));

  return router;
};

module.exports = routes;
