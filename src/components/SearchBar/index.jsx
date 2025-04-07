import { useState } from "react";

export default function SearchBar({ onSearch }) {
	const [input, setInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input) return;
		if (input.trim().length < 2) return;
		onSearch(input.toLowerCase().trim());
		setInput("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button type="submit">Search</button>
		</form>
	);
}
