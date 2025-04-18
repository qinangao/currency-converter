import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState("");

  useEffect(
    function () {
      async function converter() {
        if (!input || from === to) return;
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
        );

        const data = await res.json();

        setResult(data.rates[to]);
      }
      converter();
    },
    [input, from, to]
  );
  return (
    <div className="app">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        Result: {result} {to}
      </p>
    </div>
  );
}

export default App;
