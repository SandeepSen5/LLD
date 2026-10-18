import { useState } from "react";

// Committed (clicked) value and ephemeral hover preview are kept separate.
// Display uses preview ?? committed. One handler per event on the container (delegation).
function StarRating({ max = 5, value = 0, onChange }) {
  const [committed, setCommitted] = useState(value);
  const [preview, setPreview] = useState(null);

  const effective = preview ?? committed;

  const getStarValue = (e) => {
    const star = e.target.closest("button[data-value]");
    return star ? Number(star.dataset.value) : null;
  };

  const handleMouseOver = (e) => {
    const v = getStarValue(e);
    if (v !== null) setPreview(v);
  };

  const handleClick = (e) => {
    const v = getStarValue(e);
    if (v === null) return;
    setCommitted(v);
    onChange?.(v);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Rating"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => setPreview(null)}
      onClick={handleClick}
      style={{ display: "inline-flex", gap: 4 }}
    >
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          role="radio"
          data-value={i + 1}
          aria-checked={i + 1 === committed}
          aria-label={`${i + 1} star${i ? "s" : ""}`}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 32,
            color: i < effective ? "#f5a623" : "#ccc",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function StarRatingPage() {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Star Rating</h2>
      <StarRating onChange={setRating} />
      <p>Committed rating: {rating}</p>
    </div>
  );
}
