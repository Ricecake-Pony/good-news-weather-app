import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchCityWeather } from "../utils/fetchCityWeather";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import TodaysSummary from "../components/TodaysSummary";
import ForecastMultiDay from "../components/ForecastMultiDay";
import ForecastHourly from "../components/ForecastHourly";
import { WeatherContext } from "../context/WeatherContext";
import { ClipLoader } from "react-spinners";

export default function CityPage() {
	const { setActiveCity } = useContext(WeatherContext);
	const { cityName } = useParams();
	const [cityData, setCityData] = useState(null);

	useEffect(() => {
		async function getData() {
			const data = await fetchCityWeather({ cityName });
			setCityData(data);
			setActiveCity(data);
		}
		getData();
	}, [cityName]);

	if (!cityData)
		return (
			<ClipLoader
				color="#ff9500"
				size={30}
			/>
		);

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
