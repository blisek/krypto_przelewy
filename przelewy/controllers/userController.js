var users = [];

module.exports = {
  GetUsers: function() { return users; },
  GetUserByLogin: function(login) { users.find(function(el) { return el.login === el; }); },
  AddUser: function(user) { users.push(user); }
}
