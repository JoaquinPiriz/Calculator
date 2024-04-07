let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (!isNaN(value) || value === ".") {
        handleNumber(value);
    } else {
        handleMath(value);
    }
    screen.innerText = buffer;
}

function handleMathSubtract() {
    if (buffer === '0') {
        return;
    }
    if (runningTotal === 0) {
        runningTotal = parseFloat(buffer);
    } else {
        performOperation(parseFloat(buffer));
    }
    previousOperator = '-';
    buffer = '0';
}

function handleMath(symbol) {
    console.log("Handling math:", symbol);
    switch (symbol) {
      case '+':
      case '-':
      case '×':
      case '÷':
        if (buffer === '0') {
          return;
        }
        if (runningTotal === 0) {
          runningTotal = parseFloat(buffer);
        } else {
          performOperation(parseFloat(buffer));
        }
        previousOperator = symbol;
        buffer = '0';
        break;
      case '=':
        if (previousOperator === null) {
          return;
        }
        performOperation(parseFloat(buffer));
        previousOperator = null;
        buffer = runningTotal.toString();
        runningTotal = 0;
        break;
      case 'C':
        buffer = '0';
        runningTotal = 0;
        previousOperator = null;
        break;
      case '←':
        if (buffer.length === 1) {
          buffer = '0';
        } else {
          buffer = buffer.substring(0, buffer.length - 1);
        }
        break;
      case '-':
        console.log("Handling subtraction");
        handleMathSubtract();
        break;
    }
}

function performOperation(intBuffer) {
    console.log("Performing operation:", previousOperator, intBuffer);
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        if (intBuffer === 0) {
            alert("Error ");
            handleMath('C');
            return;
        }
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
  buffer = numberString;
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    });
}

init();