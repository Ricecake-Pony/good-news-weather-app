import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCityWeather } from "../utils/fetchCityWeather";
import WeatherCard from "../components/WeatherCard/WeatherCard";

export default function CityPage() {
	const { cityName } = useParams();
	const [cityData, setCityData] = useState(null);

	useEffect(() => {
		async function getData() {
			const data = await fetchCityWeather({ cityName });
			setCityData(data);
		}
		getData();
	}, [cityName]);

	if (!cityData) return <div>Loading weather data...</div>;

	return (
		<div className="city-page">
			<WeatherCard cityData={cityData} />
		</div>
	);
}
