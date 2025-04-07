import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import WeatherCard from "../components/WeatherCard/WeatherCard";

export default function HomePage() {
	const { activeCity } = useContext(WeatherContext);

	if (!activeCity) return <div>Loading current weather...</div>;

	return (
		<div className="home-page">
			<WeatherCard cityData={activeCity} />
		</div>
	);
}
