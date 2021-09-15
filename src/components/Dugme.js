import React from "react";

export default function Dugme({ text, click, color }) {
  const dugmeStil = {
    color: "black",
    backgroundColor: color,
    padding: "5px 10px",
    borderRadius: "15px",
    cursor: "pointer",
  };

  return (
    <div style={dugmeStil} onClick={click}>
      {text}
    </div>
  );
}
