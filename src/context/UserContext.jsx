import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const STORAGE_KEY = "goodWeatherUser";

export function UserProvider({ children }) {
	const [user, setUser] = useState({
		recentCities: [],
		userPreferences: {
			theme: "light",
			metricUnits: "imperial",
			favoriteCities: [],
		},
	});

	useEffect(() => {
		const storedUser = localStorage.getItem(STORAGE_KEY);
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (err) {
				console.error("Failed to parse user data from localStorage:", err);
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
	}, [user]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
