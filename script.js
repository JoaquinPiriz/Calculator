let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(value)){
        handleSymbol(value);
    } else {
        // Borrar el resultado actual si el usuario presiona un número
        buffer = ''; // Borrar el resultado actual
        handleNumber(value);
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
            } else {
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
    if (buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    buffer = '0';
    previousOperator = symbol;
}

function flushOperation(intBuffer){
    switch(previousOperator){
        case '+':
            runningTotal += intBuffer;
            break;
        case '-':
            runningTotal -= intBuffer;
            break;
        case 'x':
            runningTotal *= intBuffer;
            break;
        case '÷':
            runningTotal /= intBuffer;
            break;
    }
}

function handleNumber(numberString){
    if (buffer === '0'){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        buttonClick(event.target.value);
    });
}

init();