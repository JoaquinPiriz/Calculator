let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (!isNaN(value)){
        handleNumber(value);
    }else{
        handleSymbol(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
  switch(symbol){
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;
    case '=':
      if (previousOperator === null){
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '←':
      if (buffer.length === 1){
        buffer = '0';
      }else{
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '+':
    case '-':
    case 'x':
    case '÷':
      handleMath(symbol);
      break;
  }
}


function handleMath(symbol){
  if(buffer === '0'){
    return;
  }

  const intBuffer = parseInt(buffer);

  if(runningTotal === 0){
    runningTotal = intBuffer;
  } else if (previousOperator !== symbol) {
    flushOperation(intBuffer);
  }

  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer){
  if(previousOperator === '+'){
    runningTotal += intBuffer;
  }else if(previousOperator === '-'){
    runningTotal -= intBuffer;
  }else if(previousOperator === 'x'){
    runningTotal *= intBuffer;
  }else if(previousOperator === '÷'){
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString){
  if(buffer === "0"){
    buffer = numberString;
  }else{
    buffer += numberString;
  }
}

function init(){
  const buttons = document.querySelectorAll('.calc-button');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      buttonClick(this.innerText);
    });
  });
}

init();