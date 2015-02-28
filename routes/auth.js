/*jslint node: true */
"use strict";
var router = require('express').Router();
var passport = require('passport');

router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/google/return', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
