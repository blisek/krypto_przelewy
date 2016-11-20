var express = require('express');
var user = require('../model/user');
var userController = require('../controllers/userController');

module.exports = function(passport) {
  var router = express.Router();

  /* GET users listing. */
  router.get('/', function(req, res) {
      res.redirect("../");
  });

  router.post('/', passport.authenticate('local'), function(req, res) {
    res.redirect('../');
  });

  router.get('/login', function(req, res) {
    if(res.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('login');
    }
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/', failureRedirect: '/login'
  }));

  router.get('/new', function(req, res) {

  });

  router.post('/new', function(req, res) {

  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/profile', passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res) {
    var user = userController.GetUserByLogin(req.user);
    res.render('profile', { user: user });
  });

  return router;
};
