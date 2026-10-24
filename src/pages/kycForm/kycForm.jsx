import { useState } from "react";

// State model: values{} + errors{} + touched{}. Config drives fields; validate on blur and on submit.
const FIELDS = [
  {
    name: "pan",
    label: "PAN",
    placeholder: "ABCDE1234F",
    maxLength: 10,
    transform: (v) => v.toUpperCase(),
    validate: (v) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v) || "Invalid PAN (5 letters, 4 digits, 1 letter)",
  },
  {
    name: "aadhaar",
    label: "Aadhaar",
    placeholder: "123456789012",
    maxLength: 12,
    inputMode: "numeric",
    transform: (v) => v.replace(/\D/g, ""),
    validate: (v) => /^\d{12}$/.test(v) || "Invalid Aadhaar (12 digits)",
  },
];

const initial = Object.fromEntries(FIELDS.map((f) => [f.name, ""]));

function Field({ config, value, error, onChange, onBlur }) {
  const { name, label, placeholder, maxLength, inputMode } = config;
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={name} style={{ display: "block", marginBottom: 4 }}>
        {label}
      </label>
      <input
        id={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        style={{ width: "100%", padding: 8, border: `1px solid ${error ? "#d32f2f" : "#999"}` }}
      />
      {error && (
        <span id={`${name}-err`} role="alert" style={{ color: "#d32f2f", fontSize: 13 }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function KycFormPage() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name, value) => {
    const f = FIELDS.find((x) => x.name === name);
    const result = f.validate(value);
    return result === true ? "" : result;
  };

  const handleChange = (name, raw) => {
    const f = FIELDS.find((x) => x.name === name);
    const value = f.transform ? f.transform(raw) : raw;
    setValues((v) => ({ ...v, [name]: value }));
    setSubmitted(false);
    // Once a field is showing an error, clear it as soon as it becomes valid
    if (errors[name] && validateField(name, value) === "") {
      setErrors((e) => ({ ...e, [name]: "" }));
    }
  };

  const handleBlur = (name) => {
    setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = Object.fromEntries(FIELDS.map((f) => [f.name, validateField(f.name, values[f.name])]));
    setErrors(next);
    if (Object.values(next).every((m) => !m)) {
      setSubmitted(true);
    } else {
      // Move focus to the first invalid field
      const first = FIELDS.find((f) => next[f.name]);
      document.getElementById(first.name)?.focus();
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "24px auto", padding: "0 16px" }}>
      <h2>KYC Details</h2>
      <form onSubmit={handleSubmit} noValidate>
        {FIELDS.map((f) => (
          <Field
            key={f.name}
            config={f}
            value={values[f.name]}
            error={errors[f.name]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <p role="status" style={{ color: "#2e7d32" }}>
          Submitted successfully.
        </p>
      )}
    </div>
  );
}
