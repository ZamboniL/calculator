let firstNum = '';
let secondNum = '';

const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
let selectedOperator = '';


// Number functionality
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (selectedOperator) {
            secondNum += number.value;
            updateDisplay(secondNum);
            console.log(secondNum);
        } else {
            firstNum += number.value;
            updateDisplay(firstNum);
            console.log(firstNum);
        }

    });
});

// Adds operation functionality to the calculator buttons
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (selectedOperator) {
            let result = operate(selectedOperator, firstNum, secondNum);
            updateDisplay(result, true);

            selectedOperator = operator.id;
            console.log(operator.id);
        }
        else {
            selectedOperator = operator.id;
            updateDisplay(operator.value)
            console.log(operator.id);
        }

    });
});

// Enter key functionality
const enter = document.getElementById('enter');
enter.addEventListener('click', () => {
    if (selectedOperator) {
        let result = operate(selectedOperator, firstNum, secondNum);
        updateDisplay(result, true);
    }
})

// Clear button funcionalitty
// clears all of the calculator memory
const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
    firstNum = '';
    secondNum = '';
    selectedOperator = '';
    updateDisplay(firstNum);
})

// Delete last number
const backspace = document.getElementById('backspace')
backspace.addEventListener('click', () => {
    if (selectedOperator) {
        secondNum = deleteOne(secondNum);
        updateDisplay(secondNum);
    } else {
        firstNum = deleteOne(firstNum);
        updateDisplay(firstNum);
    }
});

const dot = document.getElementById('dot');
dot.addEventListener('click', () => {
    if((!firstNum.includes(dot.value)) && (!selectedOperator)) {
        firstNum += dot.value;
        updateDisplay(firstNum.padStart(2, '0'));
    }
    else if ((secondNum) && (!secondNum.includes(dot.value))) {
        secondNum += dot.value;
        updateDisplay(secondNum);
    }
});

// Function to delete the last number
function deleteOne(num) {
    return  num.substring(0, num.length -1);
}

// Update the display with the value sent
function updateDisplay(number, isResult) {
    string = number.toString();
    const display = document.getElementById('calculator-display')
    display.innerText = string;
    if (!string) {
        display.innerText = 0;
    }
    if (isResult) {
        if (string % 1 != 0) {
            display.innerText = string.substring(0, string.indexOf('.') + 8);
        }
        firstNum = string;
        secondNum = '';
    }
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
    if (operator == 'add') return add(a, b);
    else if (operator == 'subtract') return subtract(a, b);
    else if (operator == 'multiply') return multiply(a, b);
    else if (operator == 'divide') return divide(a, b);
}