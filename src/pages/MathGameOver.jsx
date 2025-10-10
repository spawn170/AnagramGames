import { useLocation, useNavigate } from "react-router-dom";

export default function MathGameOver() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score } = location.state || { score: 0 };

  return (
    <div>
      <h2>Time's Up!</h2>
      <p>Your Score: {score}</p>
      <button onClick={() => navigate("/math")}>Play Again</button>
      <button onClick={() => navigate("/")}>Back to Start Screen</button>
    </div>
  );
}
