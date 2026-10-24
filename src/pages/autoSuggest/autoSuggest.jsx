import { useEffect, useState } from "react";

const COUNTRIES = [
  "Argentina", "Australia", "Brazil", "Canada", "China", "France", "Germany", "India",
  "Indonesia", "Ireland", "Italy", "Japan", "Mexico", "Nepal", "Norway", "Singapore",
  "Spain", "Sweden", "United Kingdom", "United States",
];

// Fake API: 400ms delay, rejects if aborted
function fakeApi(query, signal) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      resolve(COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase())));
    }, 400);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

// Wrap the matched part in <mark>
function Highlight({ text, query }) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export default function AutoSuggestPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState(-1); // keyboard cursor
  const [open, setOpen] = useState(false);

  const query = input.trim();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    // Debounce: wait 300ms; cleanup clears the timer and aborts the old request
    const timer = setTimeout(() => {
      setLoading(true);
      setError(false);
      fakeApi(query, ctrl.signal)
        .then((data) => {
          setResults(data);
          setActive(-1);
          setLoading(false);
        })
        .catch((e) => {
          if (e.name !== "AbortError") {
            setError(true);
            setLoading(false);
          }
        });
    }, 300);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query]);

  const select = (value) => {
    setInput(value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      select(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 360 }}>
      <h2>Auto-suggest</h2>

      <input
        style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
        placeholder="Search country..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
      />

      {open && query && (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", border: "1px solid #bbb" }}>
          {loading && <li style={{ padding: 8 }}>Loading...</li>}
          {error && <li style={{ padding: 8, color: "crimson" }}>Something went wrong</li>}
          {!loading && !error && results.length === 0 && <li style={{ padding: 8 }}>No results</li>}
          {!loading &&
            !error &&
            results.map((r, i) => (
              <li
                key={r}
                // onMouseDown fires before the input's blur closes the list
                onMouseDown={() => select(r)}
                style={{ padding: 8, cursor: "pointer", background: i === active ? "#cfe3ff" : "none" }}
              >
                <Highlight text={r} query={query} />
              </li>
            ))}
        </ul>
      )}

      <h3>Requirements</h3>
      <p>
        <b>Functional:</b> debounce, keyboard navigation, highlight match, select, loading/empty/error states.
      </p>
      <p>
        <b>Non-functional:</b> accessibility (ARIA combobox), caching, request cancellation, performance, error
        handling.
      </p>
    </div>
  );
}
