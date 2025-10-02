import React, { useState } from "react";
import "./App.css";

// Basic display component
function Display({ value }) {
  return (
    <div className="display">
      <input
        className="input"
        value={value}
        readOnly
      />
    </div>
  );
}

// Button component
function Button({ label, onClick, className }) {
  return (
    <button
      className={`button${className ? " " + className : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default function App() {
  // State for what to display
  const [display, setDisplay] = useState("");
  const [currentStep, setCurrentStep] = useState("first"); // "first", "operator", "second"
  const [firstNum, setFirstNum] = useState("");
  const [operator, setOperator] = useState("");
  const [secondNum, setSecondNum] = useState("");
  const [result, setResult] = useState("");

  // Handles number button clicks
  const handleNumberClick = (num) => {
    if (currentStep === "first") {
      const newFirst = firstNum + num;
      setFirstNum(newFirst);
      setDisplay(newFirst);
    } else if (currentStep === "operator") {
      // Start second number, display only second number
      setSecondNum(num);
      setDisplay(num);
      setCurrentStep("second");
    } else if (currentStep === "second") {
      const newSecond = secondNum + num;
      setSecondNum(newSecond);
      setDisplay(newSecond);
    } else if (result !== "") {
      // After result, start over
      setFirstNum(num);
      setOperator("");
      setSecondNum("");
      setResult("");
      setDisplay(num);
      setCurrentStep("first");
    }
  };

  // Handles operator button clicks
  const handleOperatorClick = (op) => {
    if (firstNum !== "") {
      setOperator(op);
      setDisplay(op);
      setCurrentStep("operator");
    }
  };

  // Handles equals button click
  const handleEqualsClick = () => {
    if (firstNum && operator && secondNum) {
      const a = Number(firstNum);
      const b = Number(secondNum);
      let res = "";
      switch (operator) {
        case "+": res = (a + b).toString(); break;
        case "-": res = (a - b).toString(); break;
        case "*": res = (a * b).toString(); break;
        case "/": res = b === 0 ? "Error" : (a / b).toString(); break;
        default: res = "";
      }
      setResult(res);
      setDisplay(res);
      setCurrentStep("result");
    }
  };

  // Handles clear button click
  const handleClearClick = () => {
    setFirstNum("");
    setOperator("");
    setSecondNum("");
    setResult("");
    setDisplay("");
    setCurrentStep("first");
  };

  // Handles "Surname" button click
  const handleSurnameClick = () => {
    setDisplay("Coeli Therese Brillante");
    setCurrentStep("result");
  }

  return (
    <>
    <div className="creator">Brillante, Coeli Therese - IT3B</div>
    <div className="container">
      <div className="calculator">
        <Display value={display} />
        <div className="keypad">
          <Button label="7" onClick={() => handleNumberClick("7")} />
          <Button label="8" onClick={() => handleNumberClick("8")} />
          <Button label="9" onClick={() => handleNumberClick("9")} />
          <Button label="÷" className='operator' onClick={() => handleOperatorClick("÷")} />

          <Button label="4" onClick={() => handleNumberClick("4")} />
          <Button label="5" onClick={() => handleNumberClick("5")} />
          <Button label="6" onClick={() => handleNumberClick("6")} />
          <Button label="x" className='operator' onClick={() => handleOperatorClick("x")} />

          <Button label="1" onClick={() => handleNumberClick("1")} />
          <Button label="2" onClick={() => handleNumberClick("2")} />
          <Button label="3" onClick={() => handleNumberClick("3")} />
          <Button label="-" className='operator' onClick={() => handleOperatorClick("-")} />

          <Button label="C" className="clear" onClick={handleClearClick} />
          <Button label="0" onClick={() => handleNumberClick("0")} />
          <Button label="=" className='equals' onClick={handleEqualsClick} />
          <Button label="+" className='operator' onClick={() => handleOperatorClick("+")} />
        </div>
      </div>
    </div>
    <div className="surname-btn-wrapper">
          <Button label="BRILLANTE" onClick={handleSurnameClick} className="brillante"/>
        </div>
    </>
  );
}