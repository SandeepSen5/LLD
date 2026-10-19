import { useState } from 'react';

function StarRating({ max = 5, value = 0, onChange }) {
  const [committed, setCommitted] = useState(value);

  const [preview, setPreview] = useState(null);

  const effective = preview ?? committed;

  // Hit test: left half of a star = n - 0.5, right half = n (flipped in RTL)
  const getStarValue = (e) => {
    const star = e.target.closest("[data-value]");
    if (!star) return null;
    const rect = star.getBoundingClientRect();
    console.log("getStarValue", { rect });
    const rtl = getComputedStyle(star).direction === "rtl";
    const offset = rtl ? rect.right - e.clientX : e.clientX - rect.left;
    console.log("getStarValue11", { rtl, offset,rect });
    return Number(star.dataset.value) - (offset < rect.width / 2 ? 0.5 : 0);
  };

  // mousemove (not mouseover) so crossing the midpoint inside one star updates the preview
  const handleMouseMove = (e) => {
    const v = getStarValue(e);
    if (v !== null) setPreview(v);
  };

  const handleClick = (e) => {
    const v = getStarValue(e);
    if (v === null) return;
    setCommitted(v);
    onChange?.(v);
  };

  const handleKeyDown = (e) => {
    const step = e.shiftKey ? 0.5 : 1;
    let next = committed;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next += step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next -= step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = max;
    else return;

    e.preventDefault();
    next = Math.min(max, Math.max(0, next));
    if (next === committed) return;
    setCommitted(next);
    onChange?.(next);
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Rating"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={committed}
      aria-valuetext={`${committed} out of ${max} stars`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPreview(null)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ display: "inline-flex", gap: 0, cursor: "pointer" }}
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(1, Math.max(0, effective - i)) * 100;
        return (
          <span key={i}
            data-value={i + 1}
            aria-hidden='true'
            style={{
              position: "relative",
              display: "inline-block",
              width: 44,
              height: 44,
              lineHeight: "44px",
              textAlign: "center",
              fontSize: 32,
              userSelect: "none",
              color: "#ccc",
            }}
          >
            *
            <span
              style={{
                position: "absolute",
                inset: 0,
                color: "#f5a623",
                clipPath: `inset(0 ${100 - fill}% 0 0)`,
                pointerEvents: "none",
              }}
            >
              *
            </span>
          </span>
        )
      })
      }
    </div>
  )

}

export default function Test() {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Star Rating</h2>
      <StarRating onChange={setRating} />
      <p>Committed rating: {rating}</p>
    </div>
  )
}