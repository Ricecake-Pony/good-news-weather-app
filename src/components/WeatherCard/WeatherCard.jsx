import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather-card.css";


const fallbackImage = "./public/fallback.jpg";

const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function WeatherCard({ cityData }) {
	const [weatherUrl, setWeatherUrl] = useState("");
	const { current, location } = cityData;

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * 10) + 1;

		if (current?.condition?.text) {
			async function fetchWeatherImage() {
				const photoParams = new URLSearchParams({
					query: `${current.condition.text} atmosphere`,
					client_id: `${unsplashKey}`,
				});

				const photoByWeather = `https://api.unsplash.com/search/photos/?${photoParams.toString()}`;

				try {
					const response = await axios.get(photoByWeather, {
						headers: {
							"Accept-Version": "v1",
						},
					});

					if (response.data) {
						const weatherPhotos = response.data.results;
						const weatherPhoto = weatherPhotos[randomNum]?.urls?.regular;
						if (weatherPhoto) {
							setWeatherUrl(weatherPhoto || fallbackImage);;
						}
					}
				} catch (error) {
					console.error("Error fetching image: ", error);
				}
			}

			fetchWeatherImage();
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
