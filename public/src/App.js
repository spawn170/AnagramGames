import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AnagramHunt from "./components/AnagramHunt";
import MathGame from "./components/MathGame";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anagram-hunt" element={<AnagramHunt />} />
        <Route path="/math-game" element={<MathGame />} />
      </Routes>
    </Router>
  );
};

export default App;
