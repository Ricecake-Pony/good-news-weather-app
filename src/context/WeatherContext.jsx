import React, { createContext, useEffect, useState } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
	const location = useGeoLocation();
	const [cityWeatherData, setCityWeatherData] = useState([]);
	const [geoWeatherData, setGeoWeatherData] = useState(null); 
	const [activeCity, setActiveCity] = useState(null);

	useEffect(() => {
		if (geoWeatherData && !activeCity) {
			setActiveCity(geoWeatherData);
		}
	}, [geoWeatherData, activeCity]);


	useEffect( () => {
		const { latitude: lat, longitude: long } = location || {};
		const params = new URLSearchParams({
			key: `${apiKey}`,
			q: `${lat} ${long}`,
			days: 3,
		});

		const url = `https://api.weatherapi.com/v1/forecast.json?${params.toString()}`;
		async function fetchLocationData (){
			if (!lat || !long) return;
			try{
				const res = await axios.get(url)
				const data = res.data
				setGeoWeatherData(data)
			}
			catch(err){
				console.error("the error is:", err)
			}
		}
		fetchLocationData()
	}, [location])

	return (
		<WeatherContext.Provider value={{ cityWeatherData, setCityWeatherData, geoWeatherData, setGeoWeatherData, activeCity, setActiveCity }}>
			{children}
		</WeatherContext.Provider>
	);
}
