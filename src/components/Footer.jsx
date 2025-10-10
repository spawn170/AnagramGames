export default function Footer() {
  return (
    <footer style={footerStyle}>
      <p>© 2025 Play2Learn. All rights reserved.</p>
    </footer>
  );
}

const footerStyle = {
  background: "#f1f1f1",
  color: "#333",
  padding: "10px",
  textAlign: "center",
  position: "fixed",
  bottom: 0,
  width: "100%"
};
