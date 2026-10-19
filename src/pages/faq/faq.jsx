import { useEffect, useMemo, useState } from "react";

// State model: items (full list) -> filtered(query) -> slice(page, pageSize) -> render.
// `input` is what the user typed (updates instantly); `query` is the debounced copy used for filtering.
const ITEMS = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  question: `Question ${i + 1}: how does feature ${i + 1} work?`,
  answer: `Answer ${i + 1}: this is the explanation for feature ${i + 1}.`,
}));

function useDebounced(value, ms) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

function FaqList({ items, pageSize = 20 }) {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const query = useDebounced(input, 250).trim().toLowerCase();

  // A new query always starts from page 1
  useEffect(() => {
    setPage(1);
  }, [query]);

  const filtered = useMemo(
    () => (query ? items.filter((q) => q.question.toLowerCase().includes(query)) : items),
    [items, query]
  );

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages); // clamp if results shrink
  const slice = filtered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <input
        placeholder="Search FAQs"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div>
        {slice.length === 0 && <p>No results.</p>}
        {slice.map((item) => (
          <details key={item.id}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>

      <div>
        <button disabled={current === 1} onClick={() => setPage(current - 1)}>
          Prev
        </button>
        <span> Page {current} of {pages} </span>
        <button disabled={current === pages} onClick={() => setPage(current + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div style={{ maxWidth: 700, margin: "24px auto", padding: "0 16px" }}>
      <h2>FAQ (1000 questions, paginated)</h2>
      <FaqList items={ITEMS} pageSize={20} />
    </div>
  );
}
