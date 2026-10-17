import { useState } from "react";
import "./animationDemo.css";

export default function AnimationDemo() {
  const [running, setRunning] = useState(false);

  return (
    <div className="anim-demo">
      <h2>Layout vs Composite</h2>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? "Stop" : "Start"} animations
      </button>

      <p>
        <b>Red</b> animates <code>left</code>: Layout + Paint + Composite on every frame
      </p>
      <div className="anim-lane">
        <div className={`anim-box anim-left ${running ? "run" : ""}`}>left</div>
      </div>

      <p>
        <b>Green</b> animates <code>transform</code>: Composite only
      </p>
      <div className="anim-lane">
        <div className={`anim-box anim-transform ${running ? "run" : ""}`}>transform</div>
      </div>

      {/* Many siblings make the layout cost visible in the Performance panel */}
      <div className="anim-filler">
        {Array.from({ length: 1500 }, (_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}
