import { memo, useCallback, useRef, useState } from "react";

// Cause: one shared state object in the parent -> every keystroke re-renders the parent -> every child re-renders,
// even the 11 fields whose value did not change. React.memo only helps if props are referentially stable,
// so callbacks must keep the same identity (useCallback) and be independent of `values`.
const FIELDS = Array.from({ length: 12 }, (_, i) => ({
  name: `field${i + 1}`,
  label: `Field ${i + 1}`,
}));

const initial = Object.fromEntries(FIELDS.map((f) => [f.name, ""]));

const MODES = {
  plain: "1. No memo (every field re-renders)",
  unstable: "2. memo + new callbacks each render (memo defeated)",
  stable: "3. memo + useCallback (only the typed field re-renders)",
};

function PlainField({ name, label, value, error, onChange, onBlur }) {
  // Render counter: mutated during render on purpose, to make wasted renders visible
  const renders = useRef(0);
  renders.current += 1;

  return (
    <div style={{ marginBottom: 12 }}>
      <label htmlFor={name}>
        {label} <small style={{ color: "#888" }}>(renders: {renders.current})</small>
      </label>
      <input
        id={name}
        value={value}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={(e) => onBlur(name, e.target.value)}
        style={{ display: "block", width: "100%", padding: 6, border: `1px solid ${error ? "#d32f2f" : "#999"}` }}
      />
      {error && (
        <span id={`${name}-err`} role="alert" style={{ color: "#d32f2f", fontSize: 13 }}>
          {error}
        </span>
      )}
    </div>
  );
}

const MemoField = memo(PlainField);

export default function FormRerendersPage() {
  const [mode, setMode] = useState("stable");
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  // Stable: functional updates mean no dependency on values/errors, so identity never changes.
  // onBlur receives the value from the event instead of reading `values`, for the same reason.
  const handleChange = useCallback((name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
  }, []);

  const handleBlur = useCallback((name, value) => {
    setErrors((e) => ({ ...e, [name]: value.trim() ? "" : "Required" }));
  }, []);

  const Field = mode === "plain" ? PlainField : MemoField;

  return (
    <div style={{ maxWidth: 420, margin: "24px auto", padding: "0 16px" }}>
      <h2>Form re-renders (12 fields)</h2>

      <label htmlFor="mode">Mode </label>
      <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
        {Object.entries(MODES).map(([k, text]) => (
          <option key={k} value={k}>
            {text}
          </option>
        ))}
      </select>
      <p style={{ fontSize: 13, color: "#555" }}>
        Type in one field and watch the render counters. Changing mode remounts the fields and resets the counters.
      </p>

      <form noValidate onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map((f) => (
          <Field
            key={`${mode}-${f.name}`}
            name={f.name}
            label={f.label}
            value={values[f.name]}
            error={errors[f.name]}
            // "unstable" mode wraps handlers in fresh arrows each render: new identity -> memo sees changed props
            onChange={mode === "unstable" ? (n, v) => handleChange(n, v) : handleChange}
            onBlur={mode === "unstable" ? (n, v) => handleBlur(n, v) : handleBlur}
          />
        ))}
      </form>
    </div>
  );
}
