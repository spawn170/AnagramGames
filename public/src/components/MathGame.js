// src/components/MathGame.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MathGame() {
  const navigate = useNavigate();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  // Generate random numbers (1–12)
  function newQuestion() {
    setNum1(Math.floor(Math.random() * 12) + 1);
    setNum2(Math.floor(Math.random() * 12) + 1);
    setAnswer("");
    setMessage("");
  }

  // Start game on load
  useEffect(() => {
    newQuestion();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // End game when timer reaches 0
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      navigate("/gameover?reason=time");
    }
  }, [timeLeft, navigate]);

  // Check user answer
  function checkAnswer(e) {
    e.preventDefault();

    if (parseInt(answer) === num1 + num2) {
      setMessage("✅ Correct!");
      setScore((s) => s + 1);
      newQuestion();
    } else {
      setMessage("❌ Try again!");
    }
  }

  return (
    <div className="game-container">
      <h2>Math Facts Practice</h2>
      <p>⏳ Time Left: {timeLeft}s | 🧮 Score: {score}</p>
      <h3>{num1} + {num2} = ?</h3>

      <form onSubmit={checkAnswer}>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
          autoFocus
        />
        <button type="submit">Check</button>
      </form>

      <p>{message}</p>

      <button onClick={newQuestion}>Skip Question</button>
      <button onClick={() => navigate("/")}>Back to Start Screen</button>
    </div>
  );
}
