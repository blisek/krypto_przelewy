var express = require('express');
var user = require('../model/user');

module.exports = function(passport, userController, credentials) {
  var router = express.Router();

  // /* GET users listing. */
  // router.get('/', function(req, res) {
  //     res.redirect("../");
  // });

  router.get('/login', function(req, res) {
      res.render('login');
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: 'profile',
    failureRedirect: 'login'
  }));

  router.get('/new', function(req, res) {
    res.render('new_user');
  });

  router.post('/new', function(req, res) {
    var username = req.body.username;
    var userpass = req.body.password;

    console.warn(username);
    console.warn(userpass);

    var usr = new user.User(username, userController.ToEncryptedForm(userpass));
    userController.AddUser(usr);
    res.redirect('login');
  });

  router.get('/logout', credentials.ensureLoggedIn, function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/profile', credentials.ensureLoggedIn,
  function(req, res) {
    // var user = userController.GetUserByLogin(req.user);
      res.render('profile', { user: req.user });
  });

  return router;
};
