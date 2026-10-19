import { useEffect, useState } from "react";

const STEPS = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

// Pure, unit-testable core. Future dates (clock skew) fall through to "just now".
export function relativeTime(date, now = Date.now()) {
  const sec = Math.round((now - new Date(date).getTime()) / 1000);
  if (!(sec >= 45)) return "just now";
  for (const [unit, secsPerUnit] of STEPS) {
    if (sec >= secsPerUnit) return rtf.format(-Math.floor(sec / secsPerUnit), unit);
  }
  return "just now";
}

// Older items change less often, so tick less often.
function intervalFor(date) {
  const sec = (Date.now() - new Date(date).getTime()) / 1000;
  if (sec < 3600) return 30_000;
  if (sec < 24 * 3600) return 5 * 60_000;
  return null; // days+ old: no need to update live
}

function RelativeTime({ date }) {
  const [text, setText] = useState(() => relativeTime(date));

  useEffect(() => {
    let id;
    const tick = () => {
      setText(relativeTime(date));
      const ms = intervalFor(date);
      if (ms !== null) id = setTimeout(tick, ms);
    };
    tick();
    return () => clearTimeout(id);
  }, [date]);

  return <time dateTime={new Date(date).toISOString()}>{text}</time>;
}

const ago = (seconds) => new Date(Date.now() - seconds * 1000).toISOString();

export default function RelativeTimePage() {
  // fixed at mount so the samples don't drift on re-render
  const [samples] = useState(() => [
    ["Just posted", ago(5)],
    ["44 seconds", ago(44)],
    ["45 seconds", ago(45)],
    ["5 minutes", ago(5 * 60)],
    ["3 hours", ago(3 * 3600)],
    ["2 days", ago(2 * 86400)],
    ["45 days", ago(45 * 86400)],
    ["2 years", ago(2 * 365 * 86400)],
    ["Future (clock skew)", ago(-600)],
  ]);
  const [custom, setCustom] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>Relative Time</h2>
      <ul>
        {samples.map(([label, iso]) => (
          <li key={label}>
            {label}: <RelativeTime date={iso} />
          </li>
        ))}
      </ul>
      <label>
        Try a date:{" "}
        <input type="datetime-local" value={custom} onChange={(e) => setCustom(e.target.value)} />
      </label>
      {custom && (
        <p>
          <RelativeTime date={custom} />
        </p>
      )}
    </div>
  );
}
