import { useState, useEffect } from "react";

export default function Timer({ initialTime = 60, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  return (
    <div style={{ fontWeight: "bold", margin: "10px 0" }}>
      Time Left: {timeLeft}s
    </div>
  );
}
