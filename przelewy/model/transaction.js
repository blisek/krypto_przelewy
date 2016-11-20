var counter = 0;

function Transaction(accountNumber, price, comment) {
  this.id = counter++;
  this.accountNumber = accountNumber;
  this.price = price;
  this.comment = comment || '';
}

module.exports = {
  Transaction: Transaction
};
