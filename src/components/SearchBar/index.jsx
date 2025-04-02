import { useState } from "react";

export default function SearchBar({ onSearch }) {
	const [input, setInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input) return;
		onSearch(input);
		setInput("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value.toLowerCase().trim())}
			/>
			<button type="submit">Search</button>
		</form>
	);
}
