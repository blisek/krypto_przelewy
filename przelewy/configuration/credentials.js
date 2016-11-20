var bcryptjs = require('bcryptjs');
var salt = 'aS$t$Gic1k^-_eNOi0pNp1MY))xBfh*)h#Xgo$I6';
salt = bcryptjs.genSaltSync(10);

module.exports = {
  SALT: salt,
  ensureLoggedIn: function(req, res, next) {
    if(req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  }
};
