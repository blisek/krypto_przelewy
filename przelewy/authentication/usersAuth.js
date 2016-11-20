function User(name, pass) {
  this.name = name;
  this.pass = pass;
};

var registeredUsers = {
  'bart': new User('bart', 'abc')
};

module.exports = {
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
    done(null, user.name);
  },
  deserializer: function(userName, done) {
    done(null, registeredUsers[userName]);
  }
};
