const display = document.getElementById("ans");
let currentValue = "";
let previousValue = "";
let operator = null;

function updateDisplay() {
  display.textContent = currentValue || "0";
}

function clearCalculator() {
  currentValue = "";
  previousValue = "";
  operator = null;
  updateDisplay();
}

function appendNumber(num) {
  if (num === "." && currentValue.includes(".")) return;
  currentValue += num;
  updateDisplay();
}

function chooseOperator(op) {
  if (currentValue === "") return;
  if (previousValue !== "") compute();
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

function toggleSign() {
  if (!currentValue) return;
  currentValue = (parseFloat(currentValue) * -1).toString();
  updateDisplay();
}

function compute() {
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(curr)) return;

  let result;
  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "x":
      result = prev * curr;
      break;
    case "/":
      if (curr === 0) {
        result = "Error";
        break;
      }
      result = prev / curr;
      break;
    case "%":
      result = prev % curr;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operator = null;
  previousValue = "";
  updateDisplay();
}

document.querySelectorAll("button").forEach((btn) => {
  const value = btn.textContent;

  btn.addEventListener("click", () => {
    if (btn.classList.contains("numbers")) {
      appendNumber(value);
    } else if (value === "C") {
      clearCalculator();
    } else if (value === "+/-") {
      toggleSign();
    } else if (value === "=") {
      compute();
    } else if (["+", "-", "x", "/", "%"].includes(value)) {
      chooseOperator(value);
    }
  });
});

updateDisplay();
