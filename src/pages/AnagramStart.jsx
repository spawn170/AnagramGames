import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AnagramStart() {
  const [length, setLength] = useState(5);
  const navigate = useNavigate();

  const startGame = () => {
    if (length < 3 || length > 7) {
      alert("Please select a word length between 3 and 7.");
      return;
    }
    navigate("/anagram/play", { state: { length } });
  };

  return (
    <div>
      <Header />
      <main style={mainStyle}>
        <h2>Anagram Hunt</h2>
        <p>Choose a word length to start the game:</p>
        <div>
          <input
            type="number"
            min="3"
            max="7"
            value={length}
            onChange={e => setLength(parseInt(e.target.value))}
            style={inputStyle}
          />
        </div>
        <button onClick={startGame} style={buttonStyle}>Play!</button>
        <br />
        <button onClick={() => navigate("/")} style={backButtonStyle}>
          Back to Start Screen
        </button>
      </main>
      <Footer />
    </div>
  );
}

const mainStyle = {
  textAlign: "center",
  padding: "50px 20px"
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "80px",
  textAlign: "center",
  margin: "10px 0"
};

const buttonStyle = {
  padding: "12px 25px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
  background: "#4CAF50",
  color: "white",
  fontWeight: "bold",
  margin: "10px"
};

const backButtonStyle = {
  ...buttonStyle,
  background: "#777"
};
