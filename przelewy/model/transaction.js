var counter = 0;

function Transaction(accountNumber, moneyAmount, comment, id) {
  this.id = id || counter++;
  this.accountNumber = accountNumber;
  this.moneyAmount = moneyAmount;
  this.comment = comment || '';
}

module.exports = {
  'Transaction': Transaction,
  transactionsCompare: function(tr1, tr2) {
    return tr1.id === tr2.id && tr1.accountNumber === tr2.accountNumber &&
      tr1.moneyAmount === tr2.moneyAmount;
  }
};
