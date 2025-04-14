import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    if (input.length < 2) return;
    onSearch(input.toLowerCase().trim());
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center gap-2 shadow-md"
    >
      <input
        placeholder="Enter City Name Here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-transparent text-white placeholder-white/60 focus:outline-none w-full"
      />
      <button
        type="submit"
        className=" cursor-pointer px-3 py-1 bg-white/20 rounded-md text-white hover:bg-white/30 transition"
      >
        Search
      </button>
    </form>
  );
}
