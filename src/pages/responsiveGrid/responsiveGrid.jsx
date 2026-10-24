import { useState } from "react";
import "./responsiveGrid.css";

export default function ResponsiveGridPage() {
  const [mode, setMode] = useState("auto-fill");
  const [min, setMin] = useState(200);
  const [gap, setGap] = useState(16);
  const [count, setCount] = useState(8);

  const cards = Array.from({ length: count }, (_, i) => i + 1);

  // Values go through CSS variables, so the layout rule itself stays in the stylesheet
  const style = { "--mode": mode, "--min": `${min}px`, "--gap": `${gap}px` };

  return (
    <div className="rg-page">
      <h2>Responsive grid (CSS Grid, no media queries)</h2>
      <p style={{ fontSize: 13, color: "#555" }}>
        <code>grid-template-columns: repeat({mode}, minmax({min}px, 1fr))</code>. Resize the window and watch the
        column count change. Try 2 cards with auto-fill vs auto-fit.
      </p>

      <div className="rg-controls">
        <label>
          Mode
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="auto-fill">auto-fill</option>
            <option value="auto-fit">auto-fit</option>
          </select>
        </label>
        <label>
          Min column width: {min}px
          <input type="range" min="100" max="400" step="10" value={min} onChange={(e) => setMin(+e.target.value)} />
        </label>
        <label>
          Gap: {gap}px
          <input type="range" min="0" max="48" value={gap} onChange={(e) => setGap(+e.target.value)} />
        </label>
        <label>
          Cards: {count}
          <input type="range" min="1" max="24" value={count} onChange={(e) => setCount(+e.target.value)} />
        </label>
      </div>

      <ul className="rg-grid" style={{ ...style, listStyle: "none", padding: 0, margin: 0 }}>
        {cards.map((n) => (
          <li key={n} className={`rg-card${n === 1 ? " rg-card--wide" : ""}`}>
            <strong>Card {n}</strong>
            {n === 1 && <div style={{ fontSize: 12 }}>spans 2 columns</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
