import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../components/Timer";

export default function MathPlay() {
  const location = useLocation();
  const navigate = useNavigate(); // must be inside component

  const { operation, maxNumber } = location.state || { operation: "+", maxNumber: 10 };

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const generateProblem = () => {
    let a = Math.floor(Math.random() * (maxNumber + 1));
    let b = Math.floor(Math.random() * (maxNumber + 1));

    if (operation === "/" && b === 0) return generateProblem(); // avoid division by zero
    setNum1(a);
    setNum2(b);
    setInput("");
  };

  useEffect(() => {
    generateProblem();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let answer;
    switch (operation) {
      case "+": answer = num1 + num2; break;
      case "-": answer = num1 - num2; break;
      case "*": answer = num1 * num2; break;
      case "/": answer = parseFloat((num1 / num2).toFixed(2)); break;
      default: answer = num1 + num2;
    }

    if (parseFloat(input) === answer) {
      setScore(score + 1);
      generateProblem();
    }

    setInput("");
  };

  return (
    <div>
      <h2>Math Facts Practice</h2>
      <p>Score: {score}</p>

      {/* Timer component */}
      <Timer
        initialTime={30} // 30 seconds for math game
        onTimeUp={() => navigate("/math/gameover", { state: { score } })}
      />

      <p>Solve: {num1} {operation === "*" ? "×" : operation === "/" ? "÷" : operation} {num2} = ?</p>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
