const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const currentInput = document.querySelector("#currentInput");
const lastInput = document.querySelector("#lastInput");
const equalBtn = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const decimalBtn = document.querySelector("#decimal")

let firstNum = '';
let secondNum = '';
let operator = null;
let result = 0;
let isDecimal = false;
let justCalculated = false;

numberButtons.forEach(btn => {
    btn.addEventListener("click", () => appendNum(btn.textContent));
})

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => setOperator(btn.textContent));
})

window.addEventListener('keydown', handleKeyboardInput)
equalBtn.addEventListener("click", () => evaluate());
clearBtn.addEventListener("click", () => clear());
deleteBtn.addEventListener("click", () => deleteDigit());
decimalBtn.addEventListener("click", () => appendDecimal())

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
    if (b === 0) {
        alert("No divison by zero!");
        return clear();
    }
    return a / b;
}

function appendNum(num) {
    if (justCalculated) {
        currentInput.textContent = '';
        justCalculated = false;
    }
    if (currentInput.textContent === "0") {
        currentInput.textContent = num;
    } else {
        currentInput.textContent += num;
    }
    if (currentInput.textContent.includes(".")) {
        isDecimal = true;
    }
}

function setOperator(operation) {
    if (currentInput.textContent !== '') {
        if (operator !== null) evaluate();
        if (isDecimal) {
            firstNum = parseFloat(currentInput.textContent);
        } else {
            firstNum = parseInt(currentInput.textContent);
        }
    }
    operator = operation;
    lastInput.textContent = `${firstNum} ${operator}`
    currentInput.textContent = ''
}

function evaluate() {
    if (operator === null) {
        return
    }
    if (isDecimal) {
        secondNum = parseFloat(currentInput.textContent);
    } else {
        secondNum = parseInt(currentInput.textContent);
    }
    result = operate(firstNum, secondNum, operator);
    lastInput.textContent = `${firstNum} ${operator} ${secondNum} =`
    currentInput.textContent = result;
    operator = null;
    isDecimal = false;
    justCalculated = true;
}

function clear() {
    firstNum = "";
    secondNum = "";
    currentInput.textContent = "";
    lastInput.textContent = "";
    operator = null;
    result = 0;
}

function deleteDigit() {
    currentInput.textContent = currentInput.textContent.toString().slice(0, -1)
}

function appendDecimal() {
    if (currentInput.textContent === "") {
        currentInput.textContent = "0";
    }
    if (currentInput.textContent.includes(".")) return
    currentInput.textContent += "."
}

function operate(a, b, operation) {
    switch (operation) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "×":
            return multiply(a, b)
        case "÷":
            return divide(a, b)
        default:
            return null;
    }
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNum(e.key)
    if (e.key === '.') appendDecimal()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteDigit()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperator(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}