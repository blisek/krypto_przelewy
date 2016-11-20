
module.exports = function(userController) {
  return {
    strategy: function(username, password, done) {
      var usr = null;
      if(username in registeredUsers) {
        var tmpUsr = registeredUsers[username];
        if(tmpUsr.pass === password) {
          usr = tmpUsr;
        }
      }

      done(null, usr);
    },
    serializer: function(user, done) {
      done(null, user.login);
    },
    deserializer: function(userLogin, done) {
      done(null, userController.GetUserByLogin(userLogin));
    }
  }
};
