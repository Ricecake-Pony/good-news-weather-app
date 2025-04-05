import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WeatherContext } from "../../context/WeatherContext";
import "./weather-card.css";

const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function WeatherCard({ cityData }) {
	const { backgroundUrl } = useContext(WeatherContext);
	const [weatherUrl, setWeatherUrl] = useState("");
	const { current, location } = cityData;

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * 10); // Generate inside useEffect
		const fallbackImage = "./public/fallback.jpg";

		if (current?.condition?.text && location?.name && location?.country) {
			async function fetchWeatherImage() {
				let weatherQuery;
				const condition = current.condition.text;
				const cityName = location.name;
				const regionName = location.region;

				if (condition.includes("Sunny") || condition.includes("Clear")) {
					weatherQuery = "sunshine";
				} else if (
					condition.includes("Rain") ||
					condition.includes("Drizzle")
				) {
					weatherQuery = "rain";
				} else if (
					condition.includes("Snow") ||
					condition.includes("Sleet") ||
					condition.includes("Ice pellets")
				) {
					weatherQuery = "snow";
				} else if (
					condition.includes("Cloudy") ||
					condition.includes("Overcast")
				) {
					weatherQuery = "clouds";
				} else if (condition.includes("Fog") || condition.includes("Mist")) {
					weatherQuery = "fog";
				} else if (
					condition.includes("Thunder") ||
					condition.includes("Blizzard")
				) {
					weatherQuery = "storm";
				} else {
					weatherQuery = condition;
				}

				const photoParams = new URLSearchParams({
					query: `${weatherQuery} weather sky`,
					client_id: `${unsplashKey}`,
					content_filter: "high",
				});

				const photoByWeather = `https://api.unsplash.com/search/photos/?${photoParams.toString()}`;

				try {
					const response = await axios.get(photoByWeather, {
						headers: {
							"Accept-Version": "v1",
						},
					});

					if (response.data?.results?.length > 0) {
						const weatherPhotos = response.data.results;
						const weatherPhoto =
							weatherPhotos[randomNum % weatherPhotos.length]?.urls?.regular;
						if (weatherPhoto === backgroundUrl) {
							setWeatherUrl(fallbackImage);
						} else {
							setWeatherUrl(weatherPhoto);
						}
					} else {
						setWeatherUrl(fallbackImage); // No results
					}
				} catch (error) {
					console.error("Error fetching weather image: ", error);
					setWeatherUrl(fallbackImage);
				}
			}
			fetchWeatherImage();
		} else {
			setWeatherUrl(fallbackImage); // Handle cases where current or location data is missing
		}
	}, [cityData]);

	if (!current || !location) return <div>Loading weather data...</div>;

	return (
		<div
			className="weathercard-main-container"
			style={{
				backgroundImage: `url(${weatherUrl})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="weathercard-details">
				<div className="text-overlay">
					<img
						src={`https:${current.condition.icon}`}
						alt="weather icon"
					/>
					<br />
					<span>{current.condition.text}</span>
					<div>{current.temp_f}°F</div>
					<div>{location.name}</div>
				</div>
			</div>
		</div>
	);
}
