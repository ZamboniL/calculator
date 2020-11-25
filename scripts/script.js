let firstNum = '';
let secondNum = '';

const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
let selectedOperator = '';


// Keyboard support
const body = document.body;
body.addEventListener('keydown', (event) => {

    switch (!(isNaN(event.key)) || event.key) {
        case (true):
            valueEvent(event.key);
            break;
        case ('+'):
        case ('-'):
        case ('/'):
        case ('*'):
            operatorEvent(event.key);
            break;
        case ('Enter'):
            enterEvent();
            break;
        case ('C'):
        case ('c'):
            clearEvent();
            break;
        case ('Backspace'):
            backspaceEvent();
            break;
        case ('.'):
        case (','):
            dotEvent();
            break;
    }
});


// Number functionality
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        valueEvent(number.value);
    });
});

function valueEvent(number) {
    if (selectedOperator) {
        secondNum += number;
        updateDisplay(secondNum);
    } else {
        firstNum += number;
        updateDisplay(firstNum);
    }
}

// Adds operation functionality to the calculator buttons
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        operatorEvent(operator.value);
    });
});

function operatorEvent(operation) {
    if (selectedOperator) {
        let result = operate(selectedOperator, firstNum, secondNum);
        updateDisplay(result, true);
        selectedOperator = operation;
    }
    else {
        selectedOperator = operation;
        updateDisplay(secondNum);
    }
}

// Enter key functionality
const enter = document.getElementById('enter');
enter.addEventListener('click', () => {
    enterEvent();
});

function enterEvent() {
    if (selectedOperator) {
        let result = operate(selectedOperator, firstNum, secondNum);
        updateDisplay(result, true);
    }
}

// Clear button funcionalitty
// clears all of the calculator memory
const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    clearEvent();
})

function clearEvent() {
    firstNum = '';
    secondNum = '';
    selectedOperator = '';
    updateDisplay(firstNum);
}

// Delete last number
const backspace = document.getElementById('backspace')
backspace.addEventListener('click', () => {
    backspaceEvent();
});

function backspaceEvent() {
    if (selectedOperator) {
        secondNum = deleteOne(secondNum);
        updateDisplay(secondNum);
    } else {
        firstNum = deleteOne(firstNum);
        updateDisplay(firstNum);
    }
}
// Function to delete the last number
function deleteOne(num) {
    str = num.toString()
    return  str.substring(0, str.length -1);
}

// Add a dot at the end of the number
const dot = document.getElementById('dot');
dot.addEventListener('click', () => {
    dotEvent();
});

function dotEvent() {
    
    if((!(firstNum.toString()).includes('.')) && (!selectedOperator)) {
        firstNum += '.';
        updateDisplay(firstNum.padStart(2, '0'));
    }
    else if ((secondNum) && (!secondNum.includes('.'))) {
        secondNum += '.';
        updateDisplay(secondNum);
    }
}



// Update the display with the value sent
function updateDisplay(number, isResult) {
    resultString = number.toString();
    const resultDisplay = document.getElementById('result-display');
    const operationDisplay = document.getElementById('operation-display');

    resultString = formatNumber(resultString);
    operationString = formatNumber(firstNum);

    if (isResult) {
        if (resultString % 1 != 0) {
            resultString = resultString.substring(0, resultString.indexOf('.') + 8);
        }
        firstNum = number;
        secondNum = '';
        selectedOperator = '';
    }
    operationDisplay.innerText = operationString + ' ' + selectedOperator;
    if (!selectedOperator) {
        operationDisplay.innerText = '';
    }
    resultDisplay.innerText = resultString;
}

// Format the display number to desired formats
// like: 1.000324e+5
// if Infinite display as '∞'
function formatNumber(string) {
    
    if (string.length > 12 && !(string.includes('e'))) {
        return string[0] + '.' + string.substring(1, 6) +
                 'e+' + (string.length - 6);
    }
    else if (string.includes('e')) {
        let scientificNotation = parseInt(string.substring(string.length - 3));

        return string[0] + '.' + string.substring(2, 6) +
                 string.substring(string.length - 5, string.length - 2) +
                 (scientificNotation + 10);
    }
    
    if (!string) {
        string = '0';
    }

    if (string == Infinity) {
        string = '∞';
    }

    return string;
}
// Calc Functions

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b == 0) return 'lol';
    return a / b;
}

// Operator Function

function operate(operator, a, b) {
    if (!b) b = a;
    a = +a;
    b = +b;
    if (operator == '+') return add(a, b);
    else if (operator == '-') return subtract(a, b);
    else if (operator == '*') return multiply(a, b);
    else if (operator == '/') return divide(a, b);
}