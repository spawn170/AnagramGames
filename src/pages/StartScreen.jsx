import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StartScreen() {
  return (
    <div>
      <Header />
      <main style={mainStyle}>
        <h2>Welcome to Play2Learn!</h2>
        <p>Select a game to start playing:</p>
        <div style={buttonContainer}>
          <Link to="/anagram">
            <button style={buttonStyle}>Anagram Hunt</button>
          </Link>
          <Link to="/math">
            <button style={buttonStyle}>Math Facts Practice</button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const mainStyle = {
  textAlign: "center",
  padding: "50px 20px"
};

const buttonContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px"
};

const buttonStyle = {
  padding: "15px 25px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "none",
  background: "#4CAF50",
  color: "white",
  fontWeight: "bold"
};
