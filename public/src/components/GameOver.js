import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GameOver() {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const reason = params.get("reason");

  return (
    <div className="game-container">
      <h2>Anagram Hunt - {reason === "time" ? "Time’s Up!" : "All Done!"}</h2>
      <p>{reason === "time"
          ? "Your 60 seconds are over!"
          : "You completed all the word sets!"}</p>
      <button onClick={() => navigate("/anagram")}>Play Again</button>
      <button onClick={() => navigate("/")}>Back to Start Screen</button>
    </div>
  );
}
