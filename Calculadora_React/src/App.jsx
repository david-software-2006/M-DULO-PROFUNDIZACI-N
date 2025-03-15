import { useState } from "react";
import "./App.css";
import "./calculadora.css"; 

export default function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <h2 className="title">Calculadora Arithma</h2>
      <div className="display">{input || "0"}</div>
      <div className="buttons">
        {[
          "C", "√", "^2", "%", 
          "7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", "^", "=", "+"
        ].map((char) => (
          <button
            key={char}
            onClick={() =>
              char === "=" ? calculateResult() :
              char === "C" ? clearInput() :
              handleClick(char)
            }
            className={`button ${
              char === "=" ? "green" :
              char === "C" ? "red" :
              ["%", "√", "^2", "^"].includes(char) ? "yellow" :
              "blue"
            }`}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}
