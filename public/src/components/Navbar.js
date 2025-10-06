// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">🏠 Home</Link>
      <Link to="/anagram">🔤 Anagram Hunt</Link>
      <Link to="/math">➕ Math Facts</Link>
    </nav>
  );
}
