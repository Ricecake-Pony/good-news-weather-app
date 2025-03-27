import React, { createContext, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
	const location = useGeoLocation();
	const { latitude: lat, longitude: lon } = location || {};
	console.log("Lat:", lat, "Lon:", lon);
	const [weatherData, setWeatherData] = useState(null);


	return (
		<WeatherContext.Provider value={{ weatherData, setWeatherData }}>
			{children}
		</WeatherContext.Provider>
	);
}
