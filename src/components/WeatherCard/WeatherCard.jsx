import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { WeatherContext } from "../../context/WeatherContext";
import "./weather-card.css";
import { ClipLoader } from "react-spinners";

const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function WeatherCard({ cityData }) {
	const { backgroundUrl } = useContext(WeatherContext);
	const [weatherUrl, setWeatherUrl] = useState("");

	useEffect(() => {
		if (!cityData?.current || !cityData?.location) return;

		const randomNum = Math.floor(Math.random() * 10); 
		const fallbackImage = "./public/fallback.jpg";

			async function fetchWeatherImage() {
				let weatherQuery;
				const condition = current.condition.text;

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
					query: `${weatherQuery} weather ${location.name}`,
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
						setWeatherUrl(fallbackImage);
					}
				} catch (error) {
					console.error("Error fetching weather image: ", error);
					setWeatherUrl(fallbackImage);
				}
			}
			fetchWeatherImage();
	}, [cityData]);

	if (!cityData?.current || !cityData?.location) {
		return (
			<div className="loading-spinner">
				<ClipLoader
					color="#ff9500"
					size={30}
				/>
			</div>
		);
	}

	const { current, location } = cityData;

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
