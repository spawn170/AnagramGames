import React, { useState, useEffect } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "https://cdn.skypack.dev/react-router-dom";

// ---------------- Timer Component ----------------
function Timer({ initialTime, onTimeUp }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) return onTimeUp();
    const id = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(id);
  }, [time]);

  return <p>Time Left: {time}s</p>;
}

// ---------------- Start Screen ----------------
function StartScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Play2Learn</h1>
      <button onClick={() => navigate("/anagram")}>Anagram Hunt</button>
      <button onClick={() => navigate("/math")}>Math Facts</button>
    </div>
  );
}

// ---------------- Anagram Hunt ----------------
function AnagramGame() {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [remaining, setRemaining] = useState([]);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("./data/anagrams.json")
      .then(r => r.json())
      .then(data => {
        const array = data[Math.floor(Math.random() * data.length)];
        setWords(array);
        setCurrentWord(array[0]);
        setRemaining(array.slice(1));
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (remaining.includes(input) && input !== currentWord) {
      setScore(score + 1);
      setRemaining(remaining.filter(w => w !== input));
      setInput("");
    }
  };

  return (
    <div>
      <h2>Anagram Hunt</h2>
      <p>Score: {score}</p>
      <Timer
        initialTime={60}
        onTimeUp={() =>
          navigate("/anagram/gameover", { state: { score } })
        }
      />
      <p>Find anagrams for: <strong>{currentWord}</strong></p>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// ---------------- Math Facts ----------------
function MathGame() {
  const navigate = useNavigate();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const generateProblem = () => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
    setInput("");
  };

  useEffect(() => generateProblem(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(input) === num1 + num2) {
      setScore(score + 1);
      generateProblem();
    }
  };

  return (
    <div>
      <h2>Math Facts</h2>
      <p>Score: {score}</p>
      <Timer
        initialTime={30}
        onTimeUp={() =>
          navigate("/math/gameover", { state: { score } })
        }
      />
      <p>Solve: {num1} + {num2} = ?</p>
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

// ---------------- Game Over Screen ----------------
function GameOver({ type }) {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;

  return (
    <div>
      <h2>{type} Game Over!</h2>
      <p>Your score: {score}</p>
      <button onClick={() => navigate(type === "Math" ? "/math" : "/anagram")}>
        Play Again
      </button>
      <button onClick={() => navigate("/")}>Back to Start</button>
    </div>
  );
}

// ---------------- Main App ----------------
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/anagram" element={<AnagramGame />} />
        <Route path="/anagram/gameover" element={<GameOver type="Anagram" />} />
        <Route path="/math" element={<MathGame />} />
        <Route path="/math/gameover" element={<GameOver type="Math" />} />
      </Routes>
    </BrowserRouter>
  );
}

// ---------------- Render ----------------
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
