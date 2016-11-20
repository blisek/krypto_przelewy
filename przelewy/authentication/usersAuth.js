var debug = require('debug')('usersAuth');

module.exports = function(userController) {
  return {
    strategy: function(username, password, done) {
      var usr = null;
      var tmpUsr = userController.GetUserByLogin(username);
      if(tmpUsr !== undefined) {
        debug('Hello World!');
        if(userController.ComparePasswords(tmpUsr, password)) {
          usr = tmpUsr;
        }
      }

      done(null, usr);
    },
    serializer: function(user, done) {
      done(null, user);
    },
    deserializer: function(user, done) {
      done(null, user);
    }
  }
};
