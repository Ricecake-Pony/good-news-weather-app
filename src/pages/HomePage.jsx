import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import TodaysSummary from "../components/TodaysSummary";
import ForecastMultiDay from "../components/ForecastMultiDay";
import ForecastHourly from "../components/ForecastHourly";

export default function HomePage() {
	const { activeCity } = useContext(WeatherContext);

	if (!activeCity) return <div>Loading current weather...</div>;

	return (
		<div className="city-page">
			<div className="weather-card-main-container">
				<WeatherCard cityData={activeCity} />
				<TodaysSummary cityData={activeCity} />
				<ForecastMultiDay cityData={activeCity} />
				{/* <ForecastHourly cityData={activeCity} /> */}
			</div>
		</div>
	);
}
