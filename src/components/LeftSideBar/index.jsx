import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CurrentLocationTile from "../CurrentLocationTile";
import CityTile from "../CityTile";
import SearchBar from "../SearchBar";
import { WeatherContext } from "../../context/WeatherContext";
import { fetchCityWeather } from "../../utils/fetchCityWeather";
import "./left-sidebar.css";

export default function LeftSideBar() {
	const { cityWeatherData, setCityWeatherData, setActiveCity, geoWeatherData } =
		useContext(WeatherContext);
	const [searchError, setSearchError] = useState(null);
	const navigate = useNavigate();

	async function handleSearch(cityName) {
		try {
			const cityExists = cityWeatherData.some(
				(city) => city.location.name.toLowerCase() === cityName.toLowerCase()
			);
			if (cityExists) {
				const matchedCity = cityWeatherData.find(
					(city) => city.location.name.toLowerCase() === cityName.toLowerCase()
				);
				setActiveCity(matchedCity);
				navigate(`/city/${cityName.toLowerCase()}`);
				return;
			}

			const data = await fetchCityWeather({ cityName });
			setCityWeatherData([...cityWeatherData, data]);
			setActiveCity(data);
			navigate(`/city/${cityName.toLowerCase()}`);
		} catch (err) {
			setSearchError("❌ City not found. Please try again.");
			setTimeout(() => setSearchError(null), 4000);
		}
	}

	return (
		<div className="LeftSideBar">
			<CurrentLocationTile
				onClick={() => {
					if (geoWeatherData) {
						setActiveCity(geoWeatherData);
						navigate("/");
					}
				}}
			/>
			<SearchBar onSearch={handleSearch} />
			<ul>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				{cityWeatherData.length > 0 &&
					cityWeatherData
						.filter((city) => city?.location?.name)
						.map((city, i) => (
							<li key={i}>
								<NavLink to={`/city/${city.location.name.toLowerCase()}`}>
									<CityTile
										cityWeatherData={city}
										onClick={() => {
											console.log("Setting active city to:", city);
											setActiveCity(city);
										}}
									/>
								</NavLink>
							</li>
						))}
			</ul>
			<nav>
				<ul>
					<li>
						<NavLink to="/city/London">London</NavLink>
					</li>
					<li>
						<NavLink to="/city/New York">New York</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
}
