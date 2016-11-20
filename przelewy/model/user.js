const credentialsConfig = require('./configuration/credentials');

function User(login, password) {
  this.login = login;
  this.password = password;
  this.transactions = [];
};

User.prototype.addTransaction = function(tr) {
  this.transactions.push(tr);
};

var toEncryptedForm = function(password) {

};

module.exports = {
  User: User,
  toEncryptedForm: toEncryptedForm
};
