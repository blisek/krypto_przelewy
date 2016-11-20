var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var expressSession = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var user = require('./model/user');
var transfer = require('./routes/transfer');
var transaction = require('./model/transaction');
var sessionsConfiguration = require('./configuration/sessions');
var credentialsConfig = require('./configuration/credentials');

var usersArr = {};

var userController = require('./controllers/userController')(credentialsConfig, usersArr);
var userAuthentication = require('./authentication/usersAuth')(userController);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  secret: sessionsConfiguration.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done) {
  var usr = null;
  var tmpUsr = userController.GetUserByLogin(username);
  console.warn(tmpUsr);
  if(tmpUsr !== undefined) {
    console.warn('Hello World!');
    if(userController.ComparePasswords(tmpUsr, password)) {
      usr = tmpUsr;
    }
  }

  done(null, usr);
}));
passport.serializeUser(function(user, done) {
  done(null, user.login);
});
passport.deserializeUser(function(userLogin, done) {
  done(null, userController.GetUserByLogin(userLogin));
});

app.use('/', index);
app.use('/transfer', transfer(credentialsConfig, transaction, userController));
app.use('/users', users(passport, userController, credentialsConfig));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
