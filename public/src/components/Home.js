// src/components/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [wordLength, setWordLength] = useState(5);
  const navigate = useNavigate();

  function startAnagramGame() {
    navigate(`/anagram?length=${wordLength}`);
  }

  return (
    <div className="game-container">
      <h1>Welcome to the Game Center 🎮</h1>
      <p>Select your game below to begin!</p>

      <div className="selector">
        <h2>Anagram Hunt 🔠</h2>
        <label htmlFor="wordLength">Choose word length:</label>
        <select
          id="wordLength"
          value={wordLength}
          onChange={(e) => setWordLength(parseInt(e.target.value))}
        >
          <option value="3">3 letters</option>
          <option value="4">4 letters</option>
          <option value="5">5 letters</option>
          <option value="6">6 letters</option>
        </select>
        <button onClick={startAnagramGame}>Play!</button>
      </div>

      <div className="selector">
        <h2>Math Facts ➕</h2>
        <p>Practice your math skills!</p>
        <button onClick={() => navigate("/math")}>Play Math Game</button>
      </div>
    </div>
  );
}
