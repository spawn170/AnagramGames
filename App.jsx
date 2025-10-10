import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import StartScreen from "./pages/StartScreen";
import AnagramStart from "./pages/AnagramStart";
import AnagramPlay from "./pages/AnagramPlay";
import AnagramGameOver from "./pages/AnagramGameOver";
import MathStart from "./pages/MathStart";
import MathPlay from "./pages/MathPlay";
import MathGameOver from "./pages/MathGameOver";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home / Start Screen */}
        <Route path="/" element={<StartScreen />} />

        {/* Anagram Hunt */}
        <Route path="/anagram" element={<AnagramStart />} />
        <Route path="/anagram/play" element={<AnagramPlay />} />
        <Route path="/anagram/gameover" element={<AnagramGameOver />} />

        {/* Math Facts Practice */}
        <Route path="/math" element={<MathStart />} />
        <Route path="/math/play" element={<MathPlay />} />
        <Route path="/math/gameover" element={<MathGameOver />} />
      </Routes>
    </Router>
  );
}
