var express = require('express');
var user = require('../model/user');

module.exports = function(passport, userController) {
  var router = express.Router();

  /* GET users listing. */
  router.get('/', function(req, res) {
      res.redirect("../");
  });

  router.post('/', passport.authenticate('local'), function(req, res) {
    res.redirect('../');
  });

  router.get('/login', passport.authenticate('local', {successRedirect: '/'}),
  function(req, res) {
      res.render('login');
  });

  router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res) {
      
  });

  router.get('/new', function(req, res) {
    res.render('new_user');
  });

  router.post('/new', function(req, res) {
    var username = req.body.username;
    var userpass = req.body.password;

    var user = new user.User(username, userpass);
    userController.AddUser(user);

  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/profile', passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res) {
    // var user = userController.GetUserByLogin(req.user);
    res.render('profile', { user: req.user });
  });

  return router;
};
