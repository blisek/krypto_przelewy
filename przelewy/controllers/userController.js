const bcryptjs = require('bcryptjs');
var debug = require('debug')('userController');

module.exports = function(credentialsConfig, users) {
  return {
    GetUsers: function() { return users; },
    GetUserByLogin: function(login) { return users[login]; },
    AddUser: function(user) { users[user.login] = user; },
    ToEncryptedForm: function(password) {
      var encryptedPass = credentialsConfig.SALT +
      bcryptjs.hashSync(password, credentialsConfig.SALT);
      return encryptedPass;
      // return password;
    },
    ComparePasswords: function(user, pass) {
      var encPass = this.ToEncryptedForm(pass);
      debug('user.password: %s', user.password);
      debug('pass: %s', pass);
      debug('encryptedPass: %s', encPass);
      return user.password === encPass;
      // return user.password === pass;
    }
  };
};
