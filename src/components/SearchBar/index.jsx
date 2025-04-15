import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedInput = input.toLowerCase().trim();

    if (!cleanedInput || cleanedInput.length < 2 || !isNaN(cleanedInput)) {
      setError("Please enter a valid city name.");
      return;
    }

    try {
      await onSearch(cleanedInput);
      setInput("");
      setError("");
    } catch {
      setError("City not found. Please try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2 shadow-md"
      >
        <input
          type="text"
          placeholder="Enter City Name Here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent text-white placeholder-white/60 focus:outline-none w-full"
        />
        <button
          type="submit"
          className="cursor-pointer px-3 py-1 bg-white/20 rounded-md text-white hover:bg-white/30 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-400 text-xs mt-2 italic">{error}</p>}
    </>
  );
}
