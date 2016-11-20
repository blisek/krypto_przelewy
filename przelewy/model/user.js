
function User(login, password) {
  this.login = login;
  this.password = password;
  this.transactions = [];
};

User.prototype.addTransaction = function(tr) {
  this.transactions.push(tr);
};

module.exports = {
  User: User
}
