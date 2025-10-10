import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={headerStyle}>
      <h1>Play2Learn</h1>
      <nav>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/anagram" style={linkStyle}>Anagram Hunt</Link>
        <Link to="/math" style={linkStyle}>Math Facts</Link>
      </nav>
    </header>
  );
}

// Simple inline styles (replace with CSS if preferred)
const headerStyle = {
  background: "#4CAF50",
  color: "white",
  padding: "10px",
  textAlign: "center"
};

const linkStyle = {
  margin: "0 10px",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold"
};
