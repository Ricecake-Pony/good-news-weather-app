import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import WeatherCard from "../components/WeatherCard/WeatherCard";

export default function HomePage() {
	const { geoWeatherData } = useContext(WeatherContext);

	if (!geoWeatherData) return <div>Loading geolocation weather...</div>;

	return (
		<div className="home-page">
			<WeatherCard cityData={geoWeatherData} />
		</div>
	);
}
