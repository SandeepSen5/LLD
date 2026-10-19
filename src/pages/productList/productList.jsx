import { useEffect, useMemo, useState } from "react";
import "./productList.css";

const PAGE_SIZE = 20;
const DEBOUNCE_MS = 300;

const BRANDS = ["Nike", "Puma", "Adidas", "Roadster", "HRX", "Levis", "Zara", "H&M"];
const TYPES = ["T-Shirt", "Jeans", "Sneakers", "Jacket", "Hoodie", "Shorts", "Kurta", "Watch"];

// Stand-in for an API call: 500 SKUs after a short delay.
function fetchProducts(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) return reject(new Error("Could not load products"));
      resolve(
        Array.from({ length: 500 }, (_, i) => {
          const brand = BRANDS[i % BRANDS.length];
          const type = TYPES[(i * 3) % TYPES.length];
          return { id: i + 1, name: `${brand} ${type}`, price: 499 + ((i * 137) % 4500) };
        })
      );
    }, 700);
  });
}

// Waits until `value` stops changing for `delay` ms, then returns it.
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // each new keystroke resets the timer
  }, [value, delay]);

  return debounced;
}

export default function ProductList() {
  // Flat state: items, query, page (+ request status)
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | success
  const [simulateError, setSimulateError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);
  
  const load = (fail) => {
    setStatus("loading");
    fetchProducts(fail)
      .then((data) => {
        setItems(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    load(false);
  }, []);

  // Derived during render, not stored in state
  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => p.name.toLowerCase().includes(q));
  }, [items, debouncedQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(start, start + PAGE_SIZE);

  const onSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <main className="pl">
      <h1>Products</h1>

      <div className="pl-toolbar">
        <label htmlFor="pl-search" className="pl-label">
          Search products
        </label>
        <input
          id="pl-search"
          type="search"
          value={query}
          onChange={onSearch}
          placeholder="Try “nike” or “jeans”"
          autoComplete="off"
        />
        <label className="pl-toggle">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(e) => {
              setSimulateError(e.target.checked);
              load(e.target.checked);
            }}
          />
          Simulate error
        </label>
      </div>

      {status === "loading" && (
        <p role="status" className="pl-msg">
          Loading products…
        </p>
      )}

      {status === "error" && (
        <div role="alert" className="pl-msg pl-error">
          Something went wrong.{" "}
          <button onClick={() => load(simulateError)}>Retry</button>
        </div>
      )}

      {status === "success" && (
        <>
          <p role="status" aria-live="polite" className="pl-count">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </p>

          {filtered.length === 0 ? (
            <p className="pl-msg">No matches for “{debouncedQuery}”</p>
          ) : (
            <ul className="pl-grid">
              {paged.map((p) => (
                <li key={p.id} className="pl-card">
                  <div className="pl-name">{p.name}</div>
                  <div className="pl-price">₹{p.price}</div>
                </li>
              ))}
            </ul>
          )}

          {filtered.length > PAGE_SIZE && (
            <nav className="pl-pager" aria-label="Pagination">
              <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </button>
              <span aria-current="page">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}
