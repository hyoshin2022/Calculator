let ruuningTotal = 0;
let buffer = "0";
let preivousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    console.log(value);
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        console.log('여기');
        handleNumber(value);

    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            ruuningTotal = 0;
            break;
        case '=':
            if(preivousOperator === null) {
                return
            }
            flushOperation(paseInt(buffer));
            preivousOperator = null;
            buffer = ruuningTotal;
            ruuningTotal = 0;
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;

        default:
            break;
    }
}

function handleMath(symbol) {
    if(buffer === '0') {
        return;
    }
    
    const intBuffer = parseInt(buffer);

    if(ruuningTotal === 0) {
        ruuningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    preivousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if(preivousOperator === '+') {
        ruuningTotal += intBuffer;
    }else if(preivousOperator === '-') {
        ruuningTotal -= intBuffer;
    }else if(preivousOperator === '×') {
        ruuningTotal *= intBuffer;
    }else if(preivousOperator === '÷') {
        ruuningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    console.log('오나')
    if(buffer === '0') {
        buffer = numberString;
        console.log(numberString)
    }else {
        buffer += numberString;
        console.log(numberString)
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        buttonClick(event.target.innerText);
        console.log(event.target.innerText);
    })
}

init();