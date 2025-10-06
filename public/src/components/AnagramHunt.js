import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import anagramData from "../data/anagrams.json";

export default function AnagramGame() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const wordLength = parseInt(params.get("length")) || 5;

  const [currentSet, setCurrentSet] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [guessed, setGuessed] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [message, setMessage] = useState("");

  const timerRef = useRef(null);

  // --- Selects a new random set of anagrams ---
  function loadNewSet() {
    const possibleSets = anagramData.filter(
      (set) => set[0].length === wordLength
    );
    if (possibleSets.length === 0) {
      navigate("/gameover?reason=complete");
      return;
    }

    const newSet =
      possibleSets[Math.floor(Math.random() * possibleSets.length)];
    const randomWord = newSet[Math.floor(Math.random() * newSet.length)];

    setCurrentSet(newSet);
    setCurrentWord(randomWord);
    setGuessed([]);
    setMessage("");
  }

  // --- Timer setup ---
  useEffect(() => {
    loadNewSet();
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      navigate("/gameover?reason=time");
    }
  }, [timeLeft, navigate]);

  // --- Guess handler ---
  function handleGuess(e) {
    e.preventDefault();
    const input = e.target.elements.guess.value.toLowerCase().trim();

    if (!input) return;

    if (input === currentWord) {
      setMessage("You can’t use the word itself!");
    } else if (guessed.includes(input)) {
      setMessage("You already guessed that one!");
    } else if (currentSet.includes(input)) {
      setGuessed([...guessed, input]);
      setScore((s) => s + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage("❌ Not an anagram.");
    }

    e.target.reset();
  }

  // --- Check if round is complete ---
  useEffect(() => {
    const validAnswers = currentSet.filter((w) => w !== currentWord);
    if (guessed.length === validAnswers.length && validAnswers.length > 0) {
      loadNewSet();
    }
  }, [guessed]);

  return (
    <div className="game-container">
      <h2>Anagram Hunt - In Play</h2>
      <p>Word Length: {wordLength}</p>
      <h3>Find anagrams for: <strong>{currentWord}</strong></h3>
      <p>⏳ Time Left: {timeLeft}s | 🧮 Score: {score}</p>
      <p>Anagrams left: {currentSet.filter((w) => w !== currentWord).length - guessed.length}</p>

      <form onSubmit={handleGuess}>
        <input
          type="text"
          name="guess"
          placeholder="Type an anagram..."
          autoFocus
        />
        <button type="submit">Enter</button>
      </form>

      <p>{message}</p>

      <div className="guessed-list">
        <h4>Correct Answers:</h4>
        <ul>
          {guessed.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => navigate("/")}>Back to Start Screen</button>
    </div>
  );
}
