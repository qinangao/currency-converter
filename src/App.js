import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function converter() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${from}&to=${to}`
        );

        const data = await res.json();

        setResult(data.rates[to]);
        setIsLoading(false);
      }
      if (from === to) return setResult(input);
      converter();
    },
    [input, from, to]
  );
  return (
    <div className="app bg-stone-50 text-center w-[320px] sm:w-full p-0 sm:p-10 rounded-xl">
      <h1 className="sm:text-4xl text-2xl text-yellow-700 font-semibold  text-clifford text-center py-4 sm:pb-10">
        Currency Converter
      </h1>
      <div className="converter flex flex-col">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(Number(e.target.value))}
            disabled={isLoading}
            className="border-1 border-solid border-black mr-4"
          />
          <select
            className="border-1 border-solid border-black mr-4 mt-4"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <select
            className="border-1 border-solid border-black"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <p className="pt-8 pb-4">
          Result: {result} {to}
        </p>
      </div>
    </div>
  );
}

export default App;
