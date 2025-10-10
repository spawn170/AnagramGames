import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MathStart() {
  const [operation, setOperation] = useState("+");
  const [maxNumber, setMaxNumber] = useState(10);
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/math/play", { state: { operation, maxNumber } });
  };

  return (
    <div>
      <h2>Math Facts Practice</h2>
      <label>Operation:</label>
      <select value={operation} onChange={e => setOperation(e.target.value)}>
        <option value="+">Addition (+)</option>
        <option value="-">Subtraction (-)</option>
        <option value="*">Multiplication (×)</option>
        <option value="/">Division (÷)</option>
      </select>
      <br />
      <label>Max Number:</label>
      <input
        type="number"
        min="1"
        max="100"
        value={maxNumber}
        onChange={e => setMaxNumber(e.target.value)}
      />
      <br />
      <button onClick={startGame}>Go</button>
    </div>
  );
}
