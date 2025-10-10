import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../components/Timer"; // import Timer
import anagramsData from "../data/anagrams.json";

export default function AnagramPlay() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate must be inside the component

  const { length } = location.state || { length: 5 };
  const [currentArray, setCurrentArray] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [remainingAnagrams, setRemainingAnagrams] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");

  const pickWordArray = () => {
    const filteredArrays = anagramsData.filter(arr => arr[0].length === length);
    if (!filteredArrays.length) return;
    const randomArray = filteredArrays[Math.floor(Math.random() * filteredArrays.length)];
    const randomWord = randomArray[Math.floor(Math.random() * randomArray.length)];
    setCurrentArray(randomArray);
    setCurrentWord(randomWord);
    setRemainingAnagrams(randomArray.filter(w => w !== randomWord));
    setGuessedWords([]);
  };

  useEffect(() => {
    pickWordArray();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = input.trim().toLowerCase();
    if (!guess || guessedWords.includes(guess) || guess === currentWord) return;

    if (currentArray.includes(guess)) {
      setGuessedWords([...guessedWords, guess]);
      setScore(score + 1);
      setRemainingAnagrams(remainingAnagrams.filter(w => w !== guess));
    }

    if (remainingAnagrams.length === 1) pickWordArray();

    setInput("");
  };

  return (
    <div>
      <h2>Anagram Hunt</h2>
      <p>Score: {score}</p>

      {/* Timer goes here in the JSX */}
      <Timer
        initialTime={60}
        onTimeUp={() => navigate("/anagram/gameover", { state: { score } })}
      />

      <p>Find anagrams for: <strong>{currentWord}</strong></p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Guessed Words:</h3>
        <ul>
          {guessedWords.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>
    </div>
  );
}
