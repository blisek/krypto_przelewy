var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'ExpressApp',
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  res.send("post login");
});

module.exports = router;
