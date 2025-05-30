import React, { createContext, useEffect, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
	const location = useGeoLocation();
	const [geoWeatherData, setGeoWeatherData] = useState(null);
	const [activeCity, setActiveCity] = useState(null);
	const [backgroundUrl, setBackgroundUrl] = useState(null);
	
	useEffect(() => {
		const { latitude: lat, longitude: long } = location || {};
		const params = new URLSearchParams({
			key: `${apiKey}`,
			q: `${lat} ${long}`,
			days: 7,
		});

		const url = `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`;
		async function fetchLocationData() {
			if (!lat || !long) return;
			try {
				const res = await axios.get(url);
				const data = res.data;
				setGeoWeatherData(data);
			} catch (err) {
				console.error("the error is:", err);
			}
		}
		fetchLocationData();
	}, [location]);

	return (
		<WeatherContext.Provider
			value={{
				geoWeatherData,
				setGeoWeatherData,
				activeCity,
				setActiveCity,
				backgroundUrl,
				setBackgroundUrl,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
}
