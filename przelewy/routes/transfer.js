var express = require('express');
var pendingTransactions = {};

module.exports = function(credentialsConf, transactionModel, userController) {
  var router = express.Router();

  router.get('/make_transfer', credentialsConf.ensureLoggedIn,
  function(req, res){
    res.render('make_transfer');
  });

  router.post('/make_transfer', credentialsConf.ensureLoggedIn,
  function(req, res) {
    var accountNumber = req.body.accountNumber;
    var moneyAmount = req.body.moneyAmount;
    var comment = req.body.comment;

    console.warn("accountNumber: " + accountNumber);
    console.warn("moneyAmount: " + moneyAmount);
    console.warn("comment: " + comment);

    if(!accountNumber || !moneyAmount) {
      console.warn("inside first if");
      res.redirect('make_transfer');
    } else {
      console.warn("inside else");
      moneyAmount = parseInt(moneyAmount);
      if(isNaN(moneyAmount)) {
        res.render('error_msg', { message: 'Money amount is invalid', link: 'make_transfer' });
      } else {
        var trModel = new transactionModel.Transaction(accountNumber, moneyAmount, comment);
        var user = userController.GetUserByLogin(req.user.login);
        user.addTransaction(trModel);
        res.redirect('/users/profile');
      }
    }
  });

  return router;
}
