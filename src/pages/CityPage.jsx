import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCityWeather } from "../utils/fetchCityWeather";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import TodaysSummary from "../components/TodaysSummary";
import ForecastMultiDay from "../components/ForecastMultiDay";
import ForecastHourly from "../components/ForecastHourly";

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

	return (
		<div className="city-page">
			<div className="weather-card-main-container">
				<WeatherCard cityData={cityData} />
				<TodaysSummary cityData={cityData} />
				<ForecastMultiDay cityData={cityData} />
				{/* <ForecastHourly cityData={cityData} /> */}
			</div>
		</div>
	);
}
