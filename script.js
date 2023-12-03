let ruuningTotal = 0;
let buffer = "0";
let preivousOperator;

const screen = document.querySelector('.screen'); //DOM 요소 찾기

function buttonClick(value) { //버튼 클릭 함수 이벤트
    if(isNaN(value)){ //매개변수의 값이 숫자인지 판단 - 기호면 handleSymbol 실행 숫자면 handleNumber 실행
        handleSymbol(value); 

    }else{
        handleNumber(value);

    }
    screen.innerText = buffer; //값이 C이면 0의 문자값이 들어감
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': //취소면 0
            buffer = '0';
            ruuningTotal = 0;
            break;
        case '=':
            if(preivousOperator === null) { //이전 입력값이 없이 = 하면 리턴하게 함
                return 
            }
            flushOperation(parseInt(buffer)); //기존값에 각각의 기호대로 진행
            preivousOperator = null; //실행 후 초기화
            buffer = ruuningTotal; //실행 후 buffer에 기존 값 담음
            ruuningTotal = 0; //담은 후 초기화
            break;
        case '←':
            if(buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length -1); //젤 마지막 자리에서 지움
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
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

function flushOperation(intBuffer) { //숫자계산기호 시 
    if(preivousOperator === '+') {
        ruuningTotal += intBuffer;
    }else if(preivousOperator === '−') {
        ruuningTotal -= intBuffer;
    }else if(preivousOperator === '×') {
        ruuningTotal *= intBuffer;
    }else if(preivousOperator === '÷') {
        ruuningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if(buffer === '0') {
        buffer = numberString;
    }else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click',function(event){ //버튼클릭함수 이벤트를 숫자 버튼 div들이 들어있는 section의 class에서 찾아서 클릭시 이벤트 걸어줌
        buttonClick(event.target.innerText); //버튼 클릭 시 버튼div의 값을 함수에 넣어줌
    })
}

init();